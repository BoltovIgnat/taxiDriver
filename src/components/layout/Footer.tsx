import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="relative bg-[var(--color-hero)] text-gray-300">
      <div className="container-main section-padding grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="flex items-center gap-2 text-xl font-bold text-white">
            <i className="ri-steering-2-fill text-accent" aria-hidden />
            {siteConfig.name}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-gray-300">{siteConfig.description}</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-white">Разделы</p>
          <ul className="mt-4 space-y-3 text-sm">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-gray-300 transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-white">Информация</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/kak-nachat" className="text-gray-300 transition-colors hover:text-white">Как начать</Link></li>
            <li><Link href="/o-servise" className="text-gray-300 transition-colors hover:text-white">О сервисе</Link></li>
            <li><Link href="/blog" className="text-gray-300 transition-colors hover:text-white">Блог</Link></li>
            <li><Link href="/privacy" className="text-gray-300 transition-colors hover:text-white">Политика конфиденциальности</Link></li>
            <li><Link href="/terms" className="text-gray-300 transition-colors hover:text-white">Пользовательское соглашение</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-white">Контакты</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={`tel:${siteConfig.phone}`} className="text-gray-300 transition-colors hover:text-white">
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-gray-300 transition-colors hover:text-white">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`https://t.me/${siteConfig.telegram}`} target="_blank" rel="noopener noreferrer" className="text-gray-300 transition-colors hover:text-white">
                Telegram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-8 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} {siteConfig.name}. Все права защищены.
      </div>
    </footer>
  );
}
