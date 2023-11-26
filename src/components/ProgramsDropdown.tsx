import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import NavImage from "../assets/images/nav-image.png";
import { MdOutlineChevronRight } from "react-icons/md";

export default function ProgramsDropdown() {
  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full items-center  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            Our Program
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
          <Menu.Items className="p-10 fixed h-full sm:h-[unset] text-black z-[1000] left-0 mt-4 lg:mt-7 w-full origin-top-right divide-y divide-gray-100 bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item>
                <div className="flex flex-col sm:flex-row flex-wrap gap-10 text-base font-normal">
                  <div className="sm:w-1/6 hidden md:block">
                    <img src={NavImage} alt="efiko learning" />
                    <div className="mt-3 font-semibold">
                      Martin’s Testimonial
                    </div>
                    <div className="mt-2 text-sm font-normal">
                      A comprehensive platform with a wide range of courses,
                      with the great easy to use interface.
                    </div>
                    <div className="flex gap-1 items-center mt-2 font-semibold text-primary">
                      Learn more
                      <MdOutlineChevronRight />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-wrap justify-between gap-10">
                    <div>
                      <h3 className="font-bold">Math</h3>
                      <div className="grid gap-2 mt-4">
                        <div>Curriculum</div>
                        <div>Algebra</div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold">Science</h3>
                      <div className="grid gap-2 mt-4">
                        <div>Take a quick 10min quiz</div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold">Languages</h3>
                      <div className="grid gap-2 mt-4">
                        <div>Igbo Lessons</div>
                        <div>Yoruba Lessons</div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold">Religious Studies</h3>
                      <div className="grid gap-2 mt-4">
                        <div>CRK</div>
                        <div>IRK</div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold">Nigerian People & Culture</h3>
                      <div className="grid gap-2 mt-4">
                        <div>Curriculum</div>
                        <div>Take a quick quiz</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
