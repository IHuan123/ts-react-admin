import { createFromIconfontCN } from "@ant-design/icons";
// import PropTypes from 'prop-types';

const MyIcon = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_2972252_quq0cuxn4wh.js", // ε¨ iconfont.cn δΈηζ
})

function Icon({ type, ...itemProps }:any) {
    if (!type) return null;
    return <MyIcon type={'icon-' + type} {...itemProps} />;
}

// Icon.propTypes = {
//     type:PropTypes.string
// }
export default Icon;
