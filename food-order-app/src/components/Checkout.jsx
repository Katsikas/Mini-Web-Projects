import { useContext } from "react";
import Modal from "./UI/Modal";
import UserProgressContext from "../store/UserProgressContext";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting.js";
import Button from "./UI/Button.jsx";
import Input from "./UI/Input.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";
import { useActionState } from "react";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const { progress, hideCheckout } = useContext(UserProgressContext);
  const { items, clearCart } = useContext(CartContext);
  const { data, error, sendRequest, clearOrderData } = useHttp(
    "http://localhost:3000/orders",
    requestConfig,
  );

  const cartTotal = items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  function handleClose() {
    hideCheckout();
  }

  function handleFinish() {
    hideCheckout();
    clearCart();
    clearOrderData();
  }

  async function checkoutAction(prevState, fd) {
    const customerData = Object.fromEntries(fd.entries());

    await sendRequest(
      JSON.stringify({
        order: {
          items: items,
          customer: customerData,
        },
      }),
    );
  }

  const [formState, formAction, isSending] = useActionState(
    checkoutAction,
    null,
  );

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal open={progress === "checkout"} onClose={handleFinish}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      className="checkout"
      open={progress === "checkout"}
      onClose={handleClose}
    >
      <form action={formAction}>
        <h2>Checkout</h2>
        <ul className="checkout-items">
          {items.map((item) => (
            <li key={item.id}>
              <span>{item.quantity}x</span> {item.name}
            </li>
          ))}
        </ul>
        <p className="checkout-total-amount">
          Total Amount: <span>{currencyFormatter.format(cartTotal)}</span>
        </p>

        <Input label="Full Name" id="name" type="text" />
        <Input label="E-mail Address" id="email" type="email" />
        <Input label="Street Address" id="street" type="text" />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />
        </div>
        {error && <Error title="Failed to submit order." message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
