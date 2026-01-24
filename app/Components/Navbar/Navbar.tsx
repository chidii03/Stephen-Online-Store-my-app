import BottomNav from "./BottomNav";
import MiddleNav from "./MiddleNav";
import Topnav from "./Topnav";

export default function Navbar() {
    return (
        <>  
          <header className="w-full">
             <Topnav />
             <MiddleNav/>
             <BottomNav/>
          </header>
       </>
    )
}