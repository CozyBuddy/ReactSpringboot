import BasicMenu from "../components/menus/BasicMenu";
import CartComponent from './../components/menus/CartComponent';

const BasicLayout = ({children}) => {
    return (
        <div className="h-full">
        <BasicMenu className="overflow-auto"></BasicMenu>

        <div className="bg-white h-[90%] w-full flex flex-col space-y-1 md:space-x-1 md:space-y-0 ">
        <main className=" w-full h-full ">
        {children}
        </main>

        {/* <aside className="bg-green-300 md:w-1/3 lg:w-1/4 px-5 flex py-5 overflow-auto">
        <CartComponent className="overflow-auto"></CartComponent>
        </aside> */}
        </div>
        </div>
    )
}

export default BasicLayout;