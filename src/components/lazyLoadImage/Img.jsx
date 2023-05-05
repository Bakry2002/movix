import { LazyLoadImage } from "react-lazy-load-image-component"
// React Component to lazy load images and other components/elements. 
// Supports IntersectionObserver and includes a HOC to track window scroll position to improve performance.
import "react-lazy-load-image-component/src/effects/blur.css"; 
// LazyLoadImage includes several effects ready to be used, 
// they are useful to add visual candy to your application, 
// but are completely optional in case you don't need them or want to implement you own effect.
// They rely on CSS and the corresponding CSS file must be imported

// eslint-disable-next-line react/prop-types
const Img = ({ src, className }) => {
    if (!src || src === null || src === undefined || src === "") return;
    return (
        <LazyLoadImage 
            className={className || ''} 
            alt=""
            effect="blur"
            src={src}
        />
    )
}

export default Img; 