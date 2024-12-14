
import Header from "../(navbar)/Header";
import Navbar from "../(navbar)/Navbar";
import { Providers } from "../../../../providers/Providers";



export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (  
      <div className="flex h-screen">
      <Navbar />
    
      <main className="flex-1 w-f overflow-hidden flex flex-col ">
      	<Header />
        <div className="w-full overflow-x-hidden ">
        <Providers>
          {children}
        </Providers>
        </div>
      </main>
      
    </div>    
        
   
   
  );
}
