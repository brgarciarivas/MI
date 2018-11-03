import React from 'react';
import { connect } from 'react-redux';

import Base from './Base';
import Button from './Button';

class PurchaseItemPreview extends Base {
    render() {
        return (
            <div className='PurchaseItemPreview'>
                <div className='divider'/>
                <div className='items-container'>
                    <div className='header-container'>
                        <p>Item</p>
                        <p>Total</p>
                    </div>
                    <div className='item-tile'>
                        <p>Setcoins Monthly Subscription</p>
                        <p>$5/Monthly</p>
                    </div>
                </div>
                <Button
                    className={this.props.loading}
                    onClick={() => this.props.handlePurchaseConfirmation()}
                >
                    <p>Confirm Purchase</p>
                </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseItemPreview);
