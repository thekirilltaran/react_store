import { message } from "antd";

export default function useMessages () {
    const [messageApi, contextHolder] = message.useMessage();

    function showMess(type, info) {
        messageApi.open({
            type: type,
            content: info,
        });

    }


    return {showMess, contextHolder};
}