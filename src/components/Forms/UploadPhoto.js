import { InboxOutlined } from "@ant-design/icons";
import { Upload, Modal } from "antd";
import { useState } from "react";


const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export const UploadPhoto = ({avatar, onChangePhoto}) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };


    return (<>
                <Upload
                    beforeUpload={() => false}
                    listType="picture-card"
                    fileList={avatar}
                    onPreview={handlePreview}
                    onChange={onChangePhoto}
                >
                    {avatar?.length == 1 ? null :
                        <div>
                            <InboxOutlined />
                            <div>Upload photo</div>
                        </div>}
                </Upload>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img
                        alt="example"
                        style={{
                            width: '100%',
                        }}
                        src={previewImage}
                    />
                </Modal>
            </>
    )
}