import { proxy } from 'valtio'
import { CoreHelperUtil } from '../utils/CoreHelperUtil.js'
import { FetchUtil } from '../utils/FetchUtil.js'
import { StorageUtil } from '../utils/StorageUtil.js'
import type {
  ApiGetWalletsRequest,
  ApiGetWalletsResponse,
  ApiWallet,
  SdkVersion
} from '../utils/TypeUtils.js'
import { AssetController } from './AssetController.js'
import { ConnectorController } from './ConnectorController.js'
import { NetworkController } from './NetworkController.js'
import { OptionsController } from './OptionsController.js'

// -- Helpers ------------------------------------------- //
const api = new FetchUtil({ baseUrl: 'https://api.web3modal.com' })
const entries = '24'
const recommendedEntries = '4'
const sdkType = 'w3m'

// -- Types --------------------------------------------- //
export interface ApiControllerState {
  sdkVersion: SdkVersion
  page: number
  count: number
  recommended: ApiWallet[]
  wallets: ApiWallet[]
  search: ApiWallet[]
}

// -- State --------------------------------------------- //
const state = proxy<ApiControllerState>({
  sdkVersion: 'html-wagmi-undefined',
  page: 1,
  count: 0,
  recommended: [],
  wallets: [],
  search: []
})

// -- Controller ---------------------------------------- //
export const ApiController = {
  state,

  setSdkVersion(sdkVersion: ApiControllerState['sdkVersion']) {
    state.sdkVersion = sdkVersion
  },

  _getApiHeaders() {
    return {
      'x-project-id': OptionsController.state.projectId,
      'x-sdk-type': sdkType,
      'x-sdk-version': state.sdkVersion
    }
  },

  async _fetchWalletImage(imageId: string) {
    const imageUrl = `${api.baseUrl}/getWalletImage/${imageId}`
    const blob = await api.getBlob({ path: imageUrl, headers: ApiController._getApiHeaders() })
    AssetController.setWalletImage(imageId, URL.createObjectURL(blob))
  },

  async _fetchNetworkImage(imageId: string) {
    const imageUrl = `${api.baseUrl}/public/getAssetImage/${imageId}`
    const blob = await api.getBlob({ path: imageUrl, headers: ApiController._getApiHeaders() })
    AssetController.setNetworkImage(imageId, URL.createObjectURL(blob))
  },

  async _fetchConnectorImage(imageId: string) {
    const imageUrl = `${api.baseUrl}/public/getAssetImage/${imageId}`
    const blob = await api.getBlob({ path: imageUrl, headers: ApiController._getApiHeaders() })
    AssetController.setConnectorImage(imageId, URL.createObjectURL(blob))
  },

  async fetchNetworkImages() {
    const { requestedCaipNetworks } = NetworkController.state
    const ids = requestedCaipNetworks?.map(({ imageId }) => imageId).filter(Boolean)
    if (ids) {
      await Promise.all((ids as string[]).map(id => ApiController._fetchNetworkImage(id)))
    }
  },

  async fetchConnectorImages() {
    const { connectors } = ConnectorController.state
    const ids = connectors.map(({ imageId }) => imageId).filter(Boolean)
    await Promise.all((ids as string[]).map(id => ApiController._fetchConnectorImage(id)))
  },

  async fetchRecommendedWallets() {
    const { includeWalletIds, excludeWalletIds } = OptionsController.state
    const { data } = await api.get<ApiGetWalletsResponse>({
      path: '/getWallets',
      headers: ApiController._getApiHeaders(),
      params: {
        page: '1',
        entries: recommendedEntries,
        include: includeWalletIds?.join(','),
        exclude: excludeWalletIds?.join(',')
      }
    })
    const recent = await StorageUtil.getRecentWallets()
    const recommendedImages = data.map(d => d.image_id)
    const recentImages = recent.map(r => r.image_id)
    await Promise.all(
      [...recommendedImages, ...recentImages].map(id => ApiController._fetchWalletImage(id))
    )
    state.recommended = data
    state.count = includeWalletIds?.length ?? 0
  },

  async fetchWallets({ page }: Pick<ApiGetWalletsRequest, 'page'>) {
    const { includeWalletIds, excludeWalletIds } = OptionsController.state
    const exclude = [...state.recommended.map(({ id }) => id), ...(excludeWalletIds ?? [])]
    const { data, count } = await api.get<ApiGetWalletsResponse>({
      path: '/getWallets',
      headers: ApiController._getApiHeaders(),
      params: {
        page: String(page),
        entries,
        include: includeWalletIds?.join(','),
        exclude: exclude.join(',')
      }
    })
    await Promise.all([
      ...data.map(({ image_id }) => ApiController._fetchWalletImage(image_id)),
      CoreHelperUtil.wait(300)
    ])
    state.wallets = [...state.wallets, ...data]
    state.count = count > state.count ? count : state.count
    state.page = page
  },

  async searchWallet({ search }: Pick<ApiGetWalletsRequest, 'search'>) {
    const { includeWalletIds, excludeWalletIds } = OptionsController.state
    state.search = []
    const { data } = await api.get<ApiGetWalletsResponse>({
      path: '/getWallets',
      headers: ApiController._getApiHeaders(),
      params: {
        page: '1',
        entries: '100',
        search,
        include: includeWalletIds?.join(','),
        exclude: excludeWalletIds?.join(',')
      }
    })
    await Promise.all([
      ...data.map(({ image_id }) => ApiController._fetchWalletImage(image_id)),
      CoreHelperUtil.wait(300)
    ])
    state.search = data
  }
}
