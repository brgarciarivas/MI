import React from 'react';
import { connect } from 'react-redux';
import { injectStripe, CardElement, Elements } from 'react-stripe-elements';
import { CSSTransition } from 'react-transition-group';

import Base from './Base';
import Button from './Button';
import PurchaseItemPreview from './PurchaseItemPreview';
import { SuccessContainer } from './OnboardingContainer';


import { updateStripeToken, purchaseSubscription } from '../reducers/environment';


const PurChaseItemDescription = (props) => {

    
    const imageStyle = {
        backgroundImage: `url("${props.image_url}")`
    }
    return (
        <div className='PurChaseItemDescription'>
            <div className='top-container'>
                <div 
                    className='image-icon'
                    style={imageStyle}
                />
                <div className='title-price-contaienr'>
                    <h2>Coin: {props.name}</h2>
                    <p>$2.00</p>
                </div>
            </div>
            <span>Lorem Khaled Ipsum is a major key to success. Celebrate success right, the only way, apple. The key to success is to keep your head above the water, never give up. In life there will be road blocks but we will over come it. Look at the sunset, life is amazing, life is beautiful, life is what you make it. Special cloth alert. </span>
        </div>
    )
}

class CardFormContainer extends Base {
    state = {
        token: false,
        success: false,
        error: null,
        loading: false,
    }
    handleSubmit = (ev) => {
        ev.preventDefault();


        this.setState({ loading: true });

        // setTimeout(() => {
        //     if (true) {
        //         this.setState({ loading: false, token: true, error: null });
        //     } else {
        //         this.setState({ loading: false, error: 'Something went wrong' });
        //     }
        // }, 2000);
        
        this.props.stripe.createToken({ name: 'Bernardo Garciarivas' })
        .then(({ token }) => {
            console.log('Received Stripe token:', token);
            this.props.updateStripeToken({ userId: this.props.user.id, stripeToken: token.id })
            this.setState({ loading: false, token: true, error: null });
        }).catch((err) => {
            console.log('err', err)
            this.setState({ loading: false, error: 'Something went wrong' });
        });
    }
    
    handlePurchaseConfirmation = () => {
        console.log('handlePurchaseConfirmation');
        let that = this
        this.setState({ loading: true });

        // setTimeout(() => {
        //     if (true) {
        //         this.setState({ loading: false, success: true });
        //     } else {
        //         this.setState({ loading: false, error: 'Something went wrong' });
        //     }
        // }, 2000);


        this.props.purchaseSubscription({
            userId: this.props.user.id,
            next: (res) => {

                console.log('purchaseSubscription, res');
                if (res) {
                    that.setState({ loading: false, success: true });
                } else {
                    that.setState({ loading: false, error: 'Something went wrong' });
                }
                

            }
        })
    }
    render() {
        console.log('CollectPayment');
        console.log(this.props)
        console.log(this.state);

        const loading = this.state.loading ? 'loading' : '';
        return (
            <div className='CollectPayment'>
                <CSSTransition
                    in={this.state.success}
                    classNames='setpay'
                    appear
                    mountOnEnter
                    unmountOnExit
                    timeout={{
                        enter: 2000,
                        exit: 2000,
                    }}
                >
                    <div className='check-container'>
                        <SuccessContainer/>
                        <div className='congrats'>
                            <p>Purchase Complete!</p>
                            <span>Enjoy Setcoins</span>
                        </div>
                    </div>
                </CSSTransition>
                <CSSTransition
                    in={!this.state.success}
                    classNames='payset'
                    appear
                    mountOnEnter
                    timeout={{
                        enter: 2000,
                        exit: 2000,
                    }}
                >
                    <div className='payment-flow-container'>
                        <PurChaseItemDescription 
                            {...this.props.selectedLockedCoin}

                        />
                        <div className='con-animation'>
                            <CSSTransition
                                in={!this.state.token}
                                classNames='animate-con'
                                appear
                                mountOnEnter
                                unmountOnExit
                                timeout={{
                                    enter: 2000,
                                    exit: 2000,
                                }}
                            >
                                <form 
                                    onSubmit={this.handleSubmit}
                                    className='form-container-payment'
                                >
                                    <div className='divider'/>
                                    <CardElement style={{ base: { fontSize: '18px' }}} />
                                    <button
                                        className={loading}

                                    >
                                        Review</button>
                                </form>
                            </CSSTransition>
                            <CSSTransition
                                in={this.state.token}
                                classNames='animate-con'
                                appear
                                mountOnEnter
                                unmountOnExit
                                timeout={{
                                    enter: 2000,
                                    exit: 2000,
                                }}
                            >
                                <PurchaseItemPreview 
                                    handlePurchaseConfirmation={this.handlePurchaseConfirmation}
                                    loading={loading}
                                />
                            </CSSTransition>
                        </div>
                    </div>
                </CSSTransition>
            </div>
        );
    }
}

CardFormContainer = injectStripe(CardFormContainer);

const mapStateToProps = ({ auth, environment }, props) => {
   
    return {
        user: auth.user,
        selectedLockedCoin: environment.selectedLockedCoin,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateStripeToken: (params) => dispatch(updateStripeToken(params)),
        purchaseSubscription: (userId) => dispatch(purchaseSubscription(userId)),
    };
};

CardFormContainer = connect(mapStateToProps, mapDispatchToProps)(CardFormContainer);


export default CardFormContainer;
