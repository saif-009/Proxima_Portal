import React, { useRef, useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../../../../components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../../../../../components/ui/dialog"
import { ChevronLeft, ChevronRight } from 'lucide-react'

const AdPreview = ({ adCreative, isOpen, setIsOpen, isLoading, isError }:any) => {
  const dialogRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleClickOutside = (event:any) => {
      // @ts-ignore
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  const renderCreativeContent = (creative:any) => {
    
    if (isLoading  ) {
      return <p>Loading...</p>
    }

    
    if (isError) {
      return <p>There is error in loading preview</p>
    }

    if (!creative || creative.length === 0) {
      return <p>No creative content available.</p>;
    }
    const currentCreative = creative[currentIndex];
    return (
      <div className="relative">
        <div className="flex justify-center items-center">
          <button 
            onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : creative.length - 1))}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
          >
            <ChevronLeft size={24} className='dark:text-black' />
          </button>
          
          <div className="">
            <p className=" text-left">Creative {currentIndex + 1} of {creative.length}</p>
            {currentCreative.body && (
              <div className="flex justify-center mb-2 bg-gray-100 w-full overflow-auto">
                <div dangerouslySetInnerHTML={{ __html: currentCreative.body }} />
              </div>
            )}
          </div>
          
          <button 
            onClick={() => setCurrentIndex((prev) => (prev < creative.length - 1 ? prev + 1 : 0))}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
          >
            <ChevronRight size={24}  className='dark:text-black' />
          </button>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent ref={dialogRef} className='h-[100vh-10vh] my-1'>
        {/* <DialogHeader>
          <DialogTitle>Ad Preview</DialogTitle>
        </DialogHeader> */}
        <Tabs defaultValue="facebook" className="w-full ">
          <div className='flex justify-between mx-4'>
            <p>Ad preview</p>
          <TabsList >
            <TabsTrigger value="facebook">Facebook</TabsTrigger>
            <TabsTrigger value="instagram">Instagram</TabsTrigger>
          </TabsList>
          </div>
          
          <TabsContent value="facebook">
            <div>
              {renderCreativeContent(adCreative?.fbCreative)}
            </div>
          </TabsContent>
          <TabsContent value="instagram">
            <div>
              {renderCreativeContent(adCreative?.instagramCreative)}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default AdPreview