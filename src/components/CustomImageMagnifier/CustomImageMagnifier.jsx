import { useRef, useState } from "react";
import "./CustomImageMagnifier.css"

export default function CustomImageMagnifier({src, zoom, cursorwd, cursorhi}){
	const [isZoomed, setIsZoomed] = useState(false);
	const [position, setPosition] = useState({x:0, y:0});
	const imgRef = useRef(null);
  const cursorRef = useRef(); // 마우스커서 혹은 확대할곳

	const handleMouseEnter  = () => {
		setIsZoomed(true);
	}
  
	const handleMouseLeave = () => {
		setIsZoomed(false)
	}

	const handleMouseMove = (e) => {
		//getBoundingClientRect은 dom의 width, height, left, top, right, bottom, x, y (width, heigth는 뷰포트의 왼쪽 상단 기준)
		
		const{left, top} = imgRef.current.getBoundingClientRect();
		const x = ((e.pageX - left) / imgRef.current.width ) * 100;
		const y = ((e.pageY - top ) / imgRef.current.width ) * 100;
    
		setPosition({x,y})
	}

	return(
		<div className="img-container">

		
			<img 
				src= {src}
				alt="Zoomable"
				ref={imgRef}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onMouseMove={handleMouseMove}
			/>

			{
				isZoomed && (
					<>
					<div className="img-zoom"
					    style={{
								backgroundImage:`url(${src})`,
								backgroundSize: `${100 * zoom}% ${100 * zoom}%`,
								backgroundPosition: `${position.x}% ${position.y}%`,
								 width: imgRef.current ? `${imgRef.current.width}px` : '300px',
								 height: imgRef.current ? `${imgRef.current.height}px` : '300px'
							}}
					></div>
					<div className="img-cursor"
					   style={{
							//backgroundPosition: `${position.x}% ${position.y}%`,
						 }}
					></div>
					</>
				) 
			}
		</div>
	);
}