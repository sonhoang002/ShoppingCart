import checkout from "./checkOutPage.module.css";
import { useOutletContext, useNavigate } from "react-router";
import { useState } from "react";

function CheckOutPage() {
  const { total, cartItem, setCartItem, setTotal } = useOutletContext();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  let tax = (total / 100) * 5;

  function handleSubmit(event) {
    event.preventDefault();

    setCartItem([]);
    setTotal(0);
    setShowSuccess(true);
  }

  function closeSuccessPopup() {
    setShowSuccess(false);
    navigate("../");
  }

  return (
    <main className={checkout.checkoutPage}>
      <h1>Checkout</h1>

      <div className={checkout.checkoutContent}>
        <form className={checkout.form}>
          <fieldset>
            <legend>Contact information</legend>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value="YourEmail@gmail.com"
              disabled
            />
            <label htmlFor="phone">Phone number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value="123 456 7890"
              disabled
            />
          </fieldset>

          <fieldset>
            <legend>Shipping address</legend>

            <label htmlFor="name">Full name</label>
            <input id="name" name="name" type="text" required />

            <label htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              value="Random address 123"
              disabled
            />

            <div className={checkout.row}>
              <div>
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value="Random city"
                  disabled
                />
              </div>
              <div>
                <label htmlFor="zipCode">ZIP code</label>
                <input
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  value="12345"
                  disabled
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Payment information</legend>

            <label htmlFor="cardNumber">Card number</label>
            <input
              id="cardNumber"
              name="cardNumber"
              type="text"
              value="1234 5678 9012 3456"
              disabled
            />

            <div className={checkout.row}>
              <div>
                <label htmlFor="expiration">Expiration date</label>
                <input
                  id="expiration"
                  name="expiration"
                  type="text"
                  value="12/34"
                  disabled
                />
              </div>
              <div>
                <label htmlFor="cvv">CVV</label>
                <input id="cvv" name="cvv" type="text" value="123" disabled />
              </div>
            </div>
          </fieldset>

          <button type="submit" onClick={(e) => handleSubmit(e)}>
            Place order
          </button>
        </form>

        <aside>
          <fieldset className={checkout.orderSummary}>
            <legend>Your order</legend>

            {cartItem.map((eachItem) => (
              <div className={checkout.orderItem} key={eachItem.id}>
                <div>
                  <strong>{eachItem.title}</strong>
                  <p>Quantity: {eachItem.number}</p>
                </div>
                <span>${(eachItem.price * eachItem.number).toFixed(2)}</span>
              </div>
            ))}

            <div className={`${checkout.orderItem} ${checkout.orderItemLast}`}>
              <div>
                <strong>Tax (5%)</strong>
              </div>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className={checkout.total}>
              <strong>Total</strong>
              <strong>${(total + tax).toFixed(2)}</strong>
            </div>
          </fieldset>
        </aside>
      </div>

      {showSuccess && (
        <div className={checkout.popupBackdrop}>
          <div
            className={checkout.popup}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="success-title"
          >
            <h2 id="success-title">Purchase successful!</h2>
            <p>Thank you for your order.</p>
            <button type="button" onClick={closeSuccessPopup} autoFocus>
              Continue
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default CheckOutPage;
