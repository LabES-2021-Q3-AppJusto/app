import algoliasearch, { SearchClient, SearchIndex } from 'algoliasearch/lite';
import { Fleet } from 'appjusto-types';
import { LatLng } from 'react-native-maps';
import { AlgoliaConfig, Environment } from '../../../../config/types';
import { SearchFilter, SearchKind, SearchOrder } from '../../consumer/types';

export default class SearchApi {
  private client: SearchClient;
  private restaurants: SearchIndex;
  private restaurantsByPrice: SearchIndex;
  private restaurantsByPreparationTime: SearchIndex;
  private restaurantsByTotalOrders: SearchIndex;
  private products: SearchIndex;
  private productsByPrice: SearchIndex;
  private productsByTotalSold: SearchIndex;
  private fleets: SearchIndex;

  constructor(config: AlgoliaConfig, env: Environment) {
    this.client = algoliasearch(config.appId, config.apiKey);
    this.restaurants = this.client.initIndex(`${env}_businesses`);
    this.restaurantsByPrice = this.client.initIndex(`${env}_businesses_price_asc`);
    this.restaurantsByPreparationTime = this.client.initIndex(
      `${env}_businesses_preparation_time_asc`
    );
    this.restaurantsByTotalOrders = this.client.initIndex(`${env}_businesses_totalOrders_desc`);
    this.products = this.client.initIndex(`${env}_products`);
    this.productsByPrice = this.client.initIndex(`${env}_products_price_asc`);
    this.productsByTotalSold = this.client.initIndex(`${env}_products_totalSold_desc`);
    this.fleets = this.client.initIndex(`${env}_fleets`);
  }

  private createFilters(filters?: SearchFilter[]) {
    return filters
      ?.reduce<string[]>((result, filter) => {
        if (filter.type === 'cuisine') {
          return [...result, `cuisine: ${filter.value}`];
        } else if (filter.type === 'classification') {
          return [...result, `classifications: ${filter.value}`];
        }
        return result;
      }, [])
      .join(' OR ');
  }

  private getSearchIndex(kind: SearchKind, order: SearchOrder) {
    if (kind === 'restaurant') {
      if (order === 'distance') return this.restaurants;
      else if (order === 'price') return this.restaurantsByPrice;
      else if (order === 'preparation-time') return this.restaurantsByPreparationTime;
      else if (order === 'popularity') return this.restaurantsByTotalOrders;
    } else if (kind === 'product') {
      if (order === 'distance') return this.products;
      else if (order === 'price') return this.productsByPrice;
      else if (order === 'popularity') return this.productsByTotalSold;
      return this.products;
    }
  }

  search<T>(
    kind: SearchKind,
    order: SearchOrder,
    filters: SearchFilter[],
    aroundLocation: LatLng,
    query: string = '',
    page?: number
  ) {
    const index = this.getSearchIndex(kind, order);
    if (!index) throw new Error('Invalid index');
    return index.search<T>(query, {
      aroundLatLng: `${aroundLocation.latitude}, ${aroundLocation.longitude}`,
      page,
      filters: this.createFilters(filters),
    });
  }

  searchFleets(query: string = '', page?: number) {
    return this.fleets.search<Fleet>(query, {
      page,
    });
  }
}
