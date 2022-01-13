import { createFromIconfontCN } from "@ant-design/icons";
// import PropTypes from 'prop-types';

const MyIcon = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_2972252_quq0cuxn4wh.js", // 在 iconfont.cn 上生成
})

function Icon({ type, ...itemProps }:any) {
    if (!type) return null;
    return <MyIcon type={type} {...itemProps} />;
}

// Icon.propTypes = {
//     type:PropTypes.string
// }
export default Icon;
