import { useElementOnScreen } from '../customhooks/useElementOnScreen';

const IntersectionObservertest = () => {

//  const [isVisible,setIsVisible] = useState(false);
//  const containerRef = useRef(null)

//  const callbackFunction = (entries:any)=>{
//     const [entry] = entries
//     setIsVisible(entry.isIntersecting)
//     console.log('Fetch next Data')
//  }

//  useEffect(()=>{
//     const observer = new IntersectionObserver(callbackFunction,options)

//     if(containerRef.current) observer.observe(containerRef.current)

//       return ()=>{
//          if(containerRef.current) observer.unobserve(containerRef.current)
//       }
//  },[])

 const options ={
    root : null,
    rootMargin : "0px",
    threshold : 1.0
 }
 const [containerRef,isVisible]:any = useElementOnScreen(options);

  return (
    <div>
      <div style={{position:"fixed"}}>{isVisible ? "In View Port": "Outside of View Port"}</div>
      <hr />
      <div style={{height:'100vh',width:'100%'}}></div>
      <div ref={containerRef}>Observe me</div>
    </div>
  )
}

export default IntersectionObservertest




