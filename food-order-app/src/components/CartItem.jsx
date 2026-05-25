import { useContext } from "react";
import { currencyFormatter } from "../util/formatting.js";
import CartContext from "../store/CartContext.jsx";

export default function CartItem({ item }) {
  const { addItem, removeItem } = useContext(CartContext);

  function handleAddItem() {
    addItem(item);
  }
  function handleRemoveItem() {
    removeItem(item.id);
  }

  const totalPrice = item.price * item.quantity;

  return (
    <li className="cart-item">
      <p>
        {item.name} - {currencyFormatter.format(totalPrice)}
      </p>
      <p className="cart-item-actions">
        <button onClick={handleRemoveItem}>-</button>
        <span>{item.quantity}</span>
        <button onClick={handleAddItem}>+</button>
      </p>
    </li>
  );
}
