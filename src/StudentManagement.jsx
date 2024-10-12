// rfce enter
import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Table,
  Upload,
} from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PlusOutlined } from "@ant-design/icons";
import uploadFile from "./utils/file";
import { async } from "@firebase/util";

function StudentManagement() {
  // Quan ly sinh vien
  //1. Xem ds sinh vien
  //2. Them sinh vien moi
  //3. Update thong tin sv
  //4. Delete 1 sv

  const [students, setStudents] = useState([]);
  const [openModal, setOpenModal] = useState(false); //mac dinh modal dong
  const [submitting, setSubmitting] = useState(false);
  const [form] = useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const api = "https://66ddc2f0f7bcc0bbdcdeeff3.mockapi.io/student";

  const fetchStudent = async () => {
    // lay du lieu tu back-end

    // promise = function bat dong bo => can thoi gian de thuc hien
    // await: doi toi khi ma api tra ve ket qua
    const response = await axios.get(api);

    console.log(response.data);
    setStudents(response.data);
    // GET => lay du lieu
  };

  //[]: dependency array
  useEffect(() => {
    // hanh dong
    // chay 1 hanh dong j do
    // event
    // [] => chay khi load trang lan dau
    // [number] => chay moi khi ma number thay doi
    fetchStudent();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => {
        return <Image src={image} alt="" width={100}></Image>;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id) => {
        return (
          <>
            <Popconfirm
              title="Delete"
              description="Do you want to delete this student?"
              onConfirm={() => handleDeleteStudent(id)}
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmitStudent = async (student) => {
    // xu ly lay thong tin student trong form
    //post xuong API
    // console.log(student);

    if (fileList.length > 0) {
      const file = fileList[0];
      console.log(file);
      const url = await uploadFile(file.originFileObj);
      student.image = url;
    }
    //day data xuong cho BE
    try {
      setSubmitting(true); //bat dau load
      const response = await axios.post(api, student);
      // => thanh cong
      toast.success("Successfully create new student");
      setOpenModal(false);
      //clear du lieu cu
      form.resetFields();
      fetchStudent();
    } catch (err) {
      toast.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await axios.delete(`${api}/${studentId}`);
      toast.success("Delete successfully");
      fetchStudent();
    } catch (ex) {
      toast.error("Failed to delete student");
    }
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  return (
    <div>
      <h1>Student Management</h1>
      <Button onClick={handleOpenModal}>Create new student</Button>
      <Table columns={columns} dataSource={students} />
      {/* {neu true => modal hien, false => an} */}
      <Modal
        confirmLoading={submitting}
        onOk={() => form.submit()}
        title="Create new student"
        open={openModal}
        onCancel={handleCloseModal}
      >
        <Form onFinish={handleSubmitStudent} form={form}>
          {/* rule => dinh nghia validation => [] */}
          <Form.Item
            label="Student name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input student's name",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Student code"
            name="code"
            rules={[
              {
                required: true,
                message: "Please input student's code",
              },
              {
                pattern: "SE\\d{6}$",
                message: "Invalid format",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Student score"
            name="score"
            rules={[
              {
                required: true,
                message: "Please input student's score",
              },
              {
                type: "number",
                min: 0,
                max: 10,
                message: "Invalid score!",
              },
            ]}
          >
            <InputNumber step={0.5} />
          </Form.Item>

          <Form.Item label="image" name="image">
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
}

export default StudentManagement;
