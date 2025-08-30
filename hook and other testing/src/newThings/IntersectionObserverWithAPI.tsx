import React, { useState,useEffect,useRef, useCallback } from 'react'

const IntersectionObserverWithAPI = () => {

    const [data,setData] = useState<any>([]);
    const [hasMore,setHasMore] = useState(true);
    const [isLoading,setIsLoading] = useState(false)
    const [page, setPage] = useState(1);

    const options ={
    root : null,
    rootMargin : "0px",
    threshold : 1.0
     }

     const Intersecting= useCallback(async ()=>{
        console.log(`isloading 1 ${isLoading}...`);
        if(isLoading || ! hasMore) return

         setIsLoading(true)
        console.log(`isloading 2 ${isLoading}...`);
        console.log(`Fetching data for page ${page}...`);

        try {
            // Simulate an API call
            const response:any = await new Promise(resolve => {
                setTimeout(() => {
                    const newData = Array.from({ length: 5 }, (_, i) => `Item ${data.length + i + 1}`);
                    resolve(newData);
                }, 1000); // Simulate network delay
            });
            setData((prevData: any) => [...prevData, ...response]);
             setIsLoading(false);
            console.log(`isloading 3 ${isLoading}...`);
            setPage(prevPage => prevPage + 1);

            // You can set hasMore to false when your API returns no more data
            if (response.length === 0) {
                setHasMore(false);
            }

        } catch (error) {
            console.error("Failed to fetch data:", error);
            setIsLoading(false);
        }

     },[isLoading,page])

  const [containerRef]:any = useIntersection(options,Intersecting);
  return (
    <div>
        <div>
      <h1>Infinite Scroll Example</h1>
            <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
                <p>Scroll down to see more content load automatically.</p>
            </div>
            
            {/* Display the loaded data */}
            {data.map((item:any, index:any) => (
                <div key={index} style={{ height: '100px', border: '1px solid #ccc', margin: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item}
                </div>
            ))}
            
            {/* This is the element to observe for triggering the API call */}
            {hasMore && (
                <div ref={containerRef} style={{ height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {isLoading && <div>Loading more items...</div>}
                </div>
            )}
            
            {!hasMore && (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <p>You have reached the end of the list.</p>
                </div>
            )}
        </div>
    </div>
  )
}

export default IntersectionObserverWithAPI


//Custom Hook for intersection handling
export const useIntersection = (options:any,onIntersecting:any)=>{
    const containerRef = useRef(null);

    const callbackFunction = (entries:any)=>{
      const[entry] = entries
      if(entry.isIntersecting){
        onIntersecting()
      }
        
    }

    useEffect(()=>{
      const observer = new IntersectionObserver(callbackFunction,options)

      if(containerRef.current) observer.observe(containerRef.current)

      return ()=>{
         if(containerRef.current) observer.unobserve(containerRef.current)
      }
    },[containerRef,options,onIntersecting]) //containerRef and onIntersecting may be usefull when we have to change the ref div and the method
    return [containerRef]
}