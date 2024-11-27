import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../redux/products";
import "./index.css";


const EditProductForm = ({ setVisibleForm, idSanPham }) => {
  const dispatch = useDispatch();

  // Lấy thông tin sản phẩm theo `idSanPham`
  const product = useSelector((state) =>
    state.products.find((product) => product.id === idSanPham)
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // Cập nhật giá trị ban đầu cho form khi sản phẩm thay đổi
  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setPrice(product.price || "");
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!product) {
      alert("Không tìm thấy sản phẩm.");
      return;
    }

    // Gửi dữ liệu cập nhật về store
    dispatch(updateProduct({ id: product.id, name, price }));
    setVisibleForm(false); // Đóng form sau khi cập nhật thành công
  };

  return (
    <div className="form-container">
      <h2>Chỉnh Sửa Hàng Hóa</h2>
      {product ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tên hàng hóa"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Giá hàng hóa"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <button type="submit">Lưu Thay Đổi</button>
        </form>
      ) : (
        <p>Không tìm thấy sản phẩm để chỉnh sửa.</p>
      )}
      <button
        className="back-btn"
        onClick={() => {
          setVisibleForm(false);

        }}
      >
        Quay Lại
      </button>
    </div>
  );
};

export default EditProductForm;
