import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function LoginDropdown() {
  const navigate = useNavigate();
  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full items-center  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            Login
            <IoChevronDownCircleOutline
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item>
                <button
                  className={`text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={() => navigate("/login")}
                >
                  Tutor Login
                </button>
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                <button
                  className={`text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={() => navigate("/student-login")}
                >
                  Student Login
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
