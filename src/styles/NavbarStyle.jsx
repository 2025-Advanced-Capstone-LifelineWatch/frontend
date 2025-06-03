export const navbarStyles = {
  navWrapper: "bg-white border-b border-gray-200 sticky top-0 z-50",
  container: "max-w-7xl mx-auto px-4",
  inner: "flex items-center h-16",
  logo: "h-10 w-auto",
  
  menuWrapper: "ml-6 lg:ml-10 flex-1",
  menuItemBase:
    "px-2 lg:px-4 py-2 text-sm lg:text-base font-medium text-gray-700 hover:text-indigo-600 border-b-2 transition",
  menuItemActive: "border-indigo-600 text-indigo-600",
  menuItemInactive: "border-transparent",
  
  dropdownWrapper:
    "absolute left-1/2 -translate-x-1/2 top-11 bg-white shadow-lg rounded-md p-3 lg:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-6 w-[95vw] sm:w-[90vw] lg:w-[85vw] xl:w-[80vw] max-w-5xl z-50 border border-gray-200 transition-opacity duration-200 max-h-[80vh] overflow-y-auto",
  dropdownTitle: "text-sm lg:text-base font-bold mb-2 text-indigo-700",
  dropdownItem: "cursor-pointer hover:text-indigo-500 text-gray-600 text-xs lg:text-sm transition py-1",
  invisibleSpacer: "absolute h-2 w-full top-0 -translate-y-full",
  
  authWrapper: "flex items-center space-x-2 lg:space-x-6",
  linkBase: "text-sm lg:text-base text-gray-700 hover:text-indigo-600 whitespace-nowrap",
  iconBase: "w-4 h-4 lg:w-5 lg:h-5 text-gray-500 group-hover:text-indigo-500",
  loadingText: "text-gray-400 text-xs lg:text-sm",
};