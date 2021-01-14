import {
  ChatMessage,
  CreateOrderPayload,
  Fare,
  Issue,
  IssueType,
  Order,
  OrderIssue,
  OrderRejection,
  OrderStatus,
  PlaceOrderPayload,
  Review,
  WithId,
} from 'appjusto-types';
import firebase from 'firebase';
import { isEmpty } from 'lodash';
import FirebaseRefs from '../FirebaseRefs';
import { documentAs, documentsAs } from '../types';
import { ObserveOrdersOptions } from './types';

export const OngoingOrdersStatuses: OrderStatus[] = [
  'confirming',
  'confirmed',
  'preparing',
  'ready',
  'dispatching',
];

export default class OrderApi {
  constructor(private refs: FirebaseRefs) {}

  // callables
  // consumer
  async createOrder(payload: CreateOrderPayload) {
    return (await this.refs.getCreateOrderCallable()(payload)).data;
  }

  async getOrderQuotes(orderId: string) {
    return (await this.refs.getGetOrderQuotesCallable()({ orderId })).data as Fare[];
  }

  async placeOrder(payload: PlaceOrderPayload) {
    return (await this.refs.getPlaceOrderCallable()(payload)).data;
  }

  async cancelOrder(orderId: string, cancellation?: OrderIssue) {
    return (await this.refs.getCancelOrderCallable()({ orderId, cancellation })).data;
  }

  async tipCourier(orderId: string, tip: number) {
    return (await this.refs.getTipCourierCallable()({ orderId, tip })).data;
  }

  async sendOrderProblem(orderId: string, problem: OrderIssue) {
    return (await this.refs.getSendOrderProblemCallable()({ orderId, problem })).data;
  }

  async sendCourierReview(orderId: string, review: Review) {
    return (await this.refs.getSendCourierReviewCallable()({ orderId, review })).data;
  }

  // courier
  async matchOrder(orderId: string) {
    return (await this.refs.getMatchOrderCallable()({ orderId })).data;
  }

  async rejectOrder(orderId: string, rejection: OrderRejection) {
    return (await this.refs.getRejectOrderCallable()({ orderId, rejection })).data;
  }

  async nextDispatchingState(orderId: string) {
    return (await this.refs.getNextDispatchingStateCallable()({ orderId })).data;
  }

  async completeDelivery(orderId: string) {
    return (await this.refs.getCompleteDeliveryCallable()({ orderId })).data;
  }

  async sendCourierOrderProblem(orderId: string, problem: OrderIssue) {
    return (await this.refs.getSendCourierOrderProblemCallable()({ orderId, problem })).data;
  }

  // firestore
  // both courier & customers
  observeOrders(
    options: ObserveOrdersOptions,
    resultHandler: (orders: WithId<Order>[]) => void
  ): firebase.Unsubscribe {
    const { createdBy, deliveredBy, statuses } = options;
    let query = this.refs.getOrdersRef().orderBy('createdOn', 'desc');

    if (!isEmpty(statuses)) query = query.where('status', 'in', statuses);
    if (createdBy) query = query.where('consumer.id', '==', createdBy);
    if (deliveredBy) query = query.where('courier.id', '==', deliveredBy);

    const unsubscribe = query.onSnapshot(
      (querySnapshot) => resultHandler(documentsAs<Order>(querySnapshot.docs)),
      (error) => console.error(error)
    );
    // returns the unsubscribe function
    return unsubscribe;
  }
  observeOrder(
    orderId: string,
    resultHandler: (orders: WithId<Order>) => void
  ): firebase.Unsubscribe {
    const unsubscribe = this.refs.getOrderRef(orderId).onSnapshot(
      (snapshot) => resultHandler(documentAs<Order>(snapshot)),
      (error) => console.error(error)
    );
    // returns the unsubscribe function
    return unsubscribe;
  }
  // observe order's chat
  observeOrderChat(
    orderId: string,
    resultHandler: (orders: WithId<ChatMessage>[]) => void
  ): firebase.Unsubscribe {
    const unsubscribe = this.refs
      .getOrderChatRef(orderId)
      .orderBy('timestamp', 'asc')
      .onSnapshot(
        (querySnapshot) => resultHandler(documentsAs<ChatMessage>(querySnapshot.docs)),
        (error) => console.error(error)
      );
    // returns the unsubscribe function
    return unsubscribe;
  }

  async sendMessage(orderId: string, message: Partial<ChatMessage>) {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    return this.refs.getOrderChatRef(orderId).add({
      ...message,
      timestamp,
    });
  }

  async fetchIssues(type: IssueType) {
    const query = this.refs.getIssuesRef().where('type', '==', type);
    const docs = (await query.get()).docs;
    return documentsAs<Issue>(docs);
  }

  async deleteOrder(orderId: string) {
    return this.refs.getOrderRef(orderId).delete();
  }
}
