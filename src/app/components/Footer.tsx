import {
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Shield,
} from "lucide-react";
import logoImg from "../imports/Main_website_logo_9lmnts_studio.png";
const logoImage = logoImg;

interface FooterProps {
  onNavigate: (page: string, plan?: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-card border-t border-primary/20 font-['Orbitron']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1">
            <img
              src={logoImage}
              alt="9LMNTS Studio"
              className="h-10 w-auto mb-4"
            />
            <p className="text-muted-foreground text-xs uppercase tracking-wider">
              Where Digital Design Enters the{" "}
              <span className="font-['Permanent_Marker'] text-primary normal-case">
                CYBER CYPHER
              </span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground mb-4 text-sm font-bold uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground text-xs uppercase tracking-widest">
              <li>
                <button
                  onClick={() => onNavigate("home")}
                  className="hover:text-primary transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("services")}
                  className="hover:text-primary transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("pricing")}
                  className="hover:text-primary transition-colors"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("about")}
                  className="hover:text-primary transition-colors"
                >
                  About
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-foreground mb-4 text-sm font-bold uppercase tracking-widest">Services</h4>
            <ul className="space-y-2 text-muted-foreground text-xs uppercase tracking-widest">
              <li>
                <button
                  onClick={() => onNavigate("services")}
                  className="hover:text-primary transition-colors"
                >
                  Web Design
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("services")}
                  className="hover:text-primary transition-colors"
                >
                  Brand Identity
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("services")}
                  className="hover:text-primary transition-colors"
                >
                  UI/UX Design
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("services")}
                  className="hover:text-primary transition-colors"
                >
                  App Development
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-foreground mb-4 text-sm font-bold uppercase tracking-widest">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
            <p className="text-muted-foreground text-xs tracking-widest uppercase">
              contact@9lmnts.studio
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-primary/20 flex justify-between items-center">
          <p className="text-muted-foreground text-[10px] uppercase tracking-widest">
            © 2026 9LMNTS Studio. ALL RIGHTS RESERVED.
          </p>
          <button
            onClick={() => onNavigate("admin")}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-[10px] uppercase tracking-widest"
          >
            <Shield size={14} />
            Admin Access
          </button>
        </div>
      </div>
    </footer>
  );
}