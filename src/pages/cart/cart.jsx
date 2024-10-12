import { Button, Image, Table } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAll } from "../../redux/features/cartSlide";
import api from "../../config/axios";
import { toast } from "react-toastify";

function CartPage() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const data = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const columns = [
    {
      title: "image",
      dataIndex: "image",
      render: (img) => {
        return <Image src={img} width="200px"></Image>;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "description",
      dataIndex: "description",
    },
    {
      title: "quantity",
      dataIndex: "quantity",
    },
  ];
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  const handleBuy = async () => {
    //from id, take koi info

    try {
      const koiBought = data.filter((koi) => selectedRowKeys.includes(koi.id));
      const detail = koiBought.map((koi) => ({
        koiId: koi.id,
        quantity: koi.quantity,
      }));
      const response = await api.post("order", { detail });
      toast.success("buy successfull");
    } catch (err) {
      toast.error("err");
    }
  };
  return (
    <div>
      <Button
        onClick={() => {
          dispatch(clearAll());
        }}
      >
        clear
      </Button>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        rowKey="id"
      />
      <Button onClick={handleBuy}>Buy</Button>;
    </div>
  );
}

export default CartPage;
