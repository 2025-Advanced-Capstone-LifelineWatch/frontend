export const navbarStyles = {
  navWrapper: "bg-white border-b border-gray-200 sticky top-0 z-50",
  container: "max-w-7xl mx-auto px-4",
  inner: "flex items-center h-16",
  logo: "h-10 w-auto",

  menuWrapper: "ml-10 flex-1",
  menuItemBase:
    "px-4 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 border-b-2 transition",
  menuItemActive: "border-indigo-600 text-indigo-600",
  menuItemInactive: "border-transparent",

  dropdownWrapper:
    "absolute left-1/2 -translate-x-1/2 top-11 bg-white shadow-lg rounded-md p-4 grid grid-cols-2 md:grid-cols-4 gap-6 w-[90vw] max-w-4xl z-50 border border-gray-200 transition-opacity duration-200",
  dropdownTitle: "text-base font-bold mb-2 text-indigo-700",
  dropdownItem: "cursor-pointer hover:text-indigo-500 text-gray-600 text-sm transition",
  invisibleSpacer: "absolute h-2 w-full top-0 -translate-y-full",

  authWrapper: "flex items-center space-x-6",
  linkBase: "text-base text-gray-700 hover:text-indigo-600",
  iconBase: "w-5 h-5 text-gray-500 group-hover:text-indigo-500",
  loadingText: "text-gray-400 text-sm",
};