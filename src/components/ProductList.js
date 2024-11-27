import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal/Modal.js";
import Table from "./Table/Table.js";
import { deleteProduct } from "../redux/products.js";
import AddProductForm from "./AddProductForm.js";
import Button from "./Button/Button.js";
import EditProductForm from "./EditProduct/EditProductForm.js";

const ProductList = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [visibleForm, setVisibleForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [idSanPham, setIdSanPham] = useState();

  const columns = [
    {
      label: "Tên",
      field: "name",
      render: (val, row) => (
        <div style={{ fontWeight: val === "Tổng số" ? "bold" : undefined }}>
          {val}
        </div>
      ),
    },
    {
      label: "Giá",
      field: "price",
      render: (val, row) => (
        <div
          style={{ fontWeight: row.name === "Tổng số" ? "bold" : undefined }}
        >
          {val}
        </div>
      ),
    },
    {
      label: "Thao tác",
      width: 130,
      render: (val, row) => (
        <>
          <Button
            onClick={() => {
              setVisibleForm(true);
              setIsEdit(true);
              setIdSanPham(row.id);
            }}
            size="small"
            className="primary"
          >
            Chỉnh sửa
          </Button>

          <Button
            onClick={() => dispatch(deleteProduct(row.id))}
            style={{ marginLeft: 8 }}
            size="small"
            className="danger"
          >
            Xóa
          </Button>
        </>
      ),
    },
  ];

  // Tính tổng số tiền ngoài bảng
  const sumTable = useMemo(() => {
    return products.reduce((pre, cur) => pre + cur.price, 0);
  }, [products]);

  return (
    <div>
      <Modal onClose={() => setVisibleForm(false)} isOpen={visibleForm}>
        {isEdit ? (
          <EditProductForm
            idSanPham={idSanPham}
            setVisibleForm={setVisibleForm}
          />
        ) : (
          <AddProductForm setVisibleForm={setVisibleForm} />
        )}
      </Modal>

      <h1>Quản Lý Sản Phẩm</h1>

      <Button
        style={{ marginBottom: 8 }}
        size="medium"
        onClick={() => {
          setVisibleForm(true);
          setIsEdit(false);
        }}
      >
        Thêm Hàng Hóa
      </Button>

      {/* Hiển thị bảng */}
      <Table
        columns={columns}
        data={products}
      />

      {/* Hiển thị tổng số tiền ở ngoài bảng */}
      <div className="total-price">
        Tổng số tiền: {sumTable.toLocaleString()} VND
      </div>
    </div>
  );
};

export default ProductList;
