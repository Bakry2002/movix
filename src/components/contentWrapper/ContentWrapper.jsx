import "./style.scss"

// eslint-disable-next-line react/prop-types
const ContentWrapper = ({ children }) => {
    return (
        <div className="content-wrapper">{children}</div>
    )
}
export default ContentWrapper; 