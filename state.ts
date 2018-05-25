interface State {
    order: Order;

    cancelOrder();
    verifyPayment();
    shipOrder();
}
class Order {
    public cancelledOrderState: State;
    public paymentPendingState: State;
    public orderBeingPreparedState: State;
    public orderShippedState: State;

    public currentState: State;

    constructor() {
        this.cancelledOrderState = new CancelledOrderState(this);
        this.paymentPendingState = new PaymentPendingState(this);
        this.orderBeingPreparedState = new OrderBeingPrepardState(this);
        this.orderShippedState = new OrderShippedState(this);

        this.setState(this.paymentPendingState);
    }
    public setState(state: State){
        this.currentState = state;
    }

    public getState(): State{
        return this.currentState;
    }
}

class PaymentPendingState implements State {
    public order: Order;

    constructor(order: Order){
        this.order = order;
    }
    cancelOrder() {
        console.log('Canceling your unpaid order...');
        this.order.setState(this.order.cancelledOrderState);
    }
    verifyPayment() {
        console.log('payment verified! Shipping soon');
        this.order.setState(this.order.orderBeingPreparedState);
    }
    shipOrder() {
        console.log('we cannot ship the order when payment is pending!');
    }
}

class CancelledOrderState implements State {
    public order: Order;

    constructor(order: Order){
        this.order = order;
    }
    cancelOrder() {
        console.log('your order has already been cancelled!');
    }
    verifyPayment() {
        console.log('Order cancelled, you cannot verify payment!');
    }
    shipOrder() {
        console.log('Order cancelled, you can not ship order!');
    }
}

class OrderBeingPrepardState implements State {
    public order: Order;

    constructor(order: Order){
        this.order = order;
    }
    cancelOrder() {
        console.log('cancelling your order...');
        this.order.setState(this.order.cancelledOrderState);
    }
    verifyPayment() {
        console.log('Order is already verified and being prepared');
    }
    shipOrder() {
        console.log('Order is prepared and shipped to your location!');
        this.order.setState(this.order.orderShippedState);
    }
}

class OrderShippedState implements State {
    public order: Order;

    constructor(order: Order){
        this.order = order;
    }
    cancelOrder() {
        console.log('your order has already been shipped! cannot cancel');
    }
    verifyPayment() {
        console.log('Order is shipped, cannot verify payment');
    }
    shipOrder() {
        console.log('Order shipped, you can not ship order again!');
    }
}

let order = new Order();
order.getState().verifyPayment();
order.getState().shipOrder();
order.getState().cancelOrder();

console.log('Order state: ' + (<any> order.getState()).constructor.name);