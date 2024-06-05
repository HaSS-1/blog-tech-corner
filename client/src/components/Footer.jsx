import React from "react";
import { Link } from "react-router-dom";
import { BsFacebook, BsLinkedin, BsGithub, BsTwitter, BsStackOverflow } from "react-icons/bs";
import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";

export default function FooterComp() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
      <div className="grid w-full justify-between sm:flex md:grid-cols-1">
        <div className="mt-5">
            <Link
                    to="/"
                    className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
                    >
                    <span
                        className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                        rounded-lg text-white"
                    >
                        My Tech Corner
                    </span>
                    Blog
            </Link>
            </div>
        <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
           <div>
           <FooterTitle title='About' />
            <FooterLinkGroup col>
                <FooterLink href="#"
                target='_blank'
                rel="noopner noreferrer">
                    Web Dev Projects
                </FooterLink>
                <FooterLink href="/about"
                target='_blank'
                rel="noopner noreferrer">
                    About
                </FooterLink>
                <FooterLink href="#"
                target='_blank'
                rel="noopner noreferrer">
                    Web Dev Projects
                </FooterLink>
            </FooterLinkGroup>
           </div>
           <div>
           <FooterTitle title='Find Me at :' />
            <FooterLinkGroup col>
                <FooterLink href="https://www.github.com/has-1"
                target='_blank'
                rel="noopner noreferrer">
                    Github
                </FooterLink>
                <FooterLink href="https://www.pixabay.com/users/tajirihassan-17834754"
                target='_blank'
                rel="noopner noreferrer">
                    Pixabay
                </FooterLink>
                <FooterLink href="#"
                target='_blank'
                rel="noopner noreferrer">
                    Discord
                </FooterLink>
            </FooterLinkGroup>
           </div>
           <div>
           <FooterTitle title='legal' />
            <FooterLinkGroup col>
                <FooterLink href="#"
                >
                    Privacy Policy
                </FooterLink>
                <FooterLink href="#">
                    Terms &amp; Conditions
                </FooterLink>
                <FooterLink href="#">
                    Other
                </FooterLink>
            </FooterLinkGroup>
           </div>
            
          </div>
          
        </div>
        <FooterDivider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
        <FooterCopyright
              href="#"
              by="Hassan's Blog"
              year={new Date().getFullYear()}
            />
            <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                <FooterIcon href="#" icon={BsFacebook} />
                <FooterIcon href="#" icon={BsTwitter} />
                <FooterIcon href="#" icon={BsLinkedin} />
                <FooterIcon href="#" icon={BsGithub} />
                <FooterIcon href="#" icon={BsStackOverflow} />
            </div>
        </div>
      </div>
    </Footer>
  );
}
