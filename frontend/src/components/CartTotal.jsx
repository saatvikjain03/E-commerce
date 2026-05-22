import { useContext } from "react";
import Title from "./Title";
import { ShopContext } from "../context/Shopcontext";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  const subtotal = getCartAmount();

  // Make shipping free if subtotal > 1000
  const shippingFee = subtotal >= 1000 ? 0 : delivery_fee;

  const total = subtotal + shippingFee;

  const formatCurrency = (amount) => {
    return `${currency} ${amount.toFixed(2)}`;
  };

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{formatCurrency(subtotal)}</p>
        </div>

        <hr />

        <div>
          <div className="flex justify-between">
            <p>Shipping Fee</p>
            <p>{formatCurrency(shippingFee)}</p>
          </div>

          {subtotal >= 1000 && (
            <p className="text-green-600 text-xs mt-1">
              Free Shipping Applied!
            </p>
          )}
        </div>

        <hr />

        <div className="flex justify-between">
          <b>Total</b>
          <b>{formatCurrency(total)}</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
