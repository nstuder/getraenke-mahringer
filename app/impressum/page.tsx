'use client';

import React, {useState} from 'react';

export default function ImpressumPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        website: '',
        phone: '',
        subject: '',
        message: '',
        acceptTerms: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Implementation of form submission would go here
        console.log('Form submitted:', formData);
        alert('Vielen Dank für Ihre Nachricht. Wir werden uns in Kürze bei Ihnen melden.');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value, type} = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData((prev) => ({...prev, [name]: checked}));
        } else {
            setFormData((prev) => ({...prev, [name]: value}));
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-4xl font-bold text-darkblue mb-8">Impressum & Kontakt</h1>

            <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 text-foreground">
                <section>
                    <h2 className="text-2xl font-semibold text-darkblue mb-4 border-b border-primary/20 pb-2">Rechtliche
                        Informationen</h2>
                    <div className="space-y-2">
                        <p className="font-bold text-lg">Getränkeservice Bernd Mahringer</p>
                        <p>Forlenstraße 4-6</p>
                        <p>68305 Mannheim</p>
                        <div className="pt-4 space-y-1">
                            <p><span className="font-semibold">Telefon:</span> +49 (0)6 21 75 39 54</p>
                            <p><span className="font-semibold">Fax:</span> +49 (0)6 21 75 39 54</p>
                            <p><span className="font-semibold">E-Mail:</span> <a
                                href="mailto:bernd-mahringer@t-online.de"
                                className="text-primary hover:underline">bernd-mahringer@t-online.de</a>
                            </p>
                        </div>
                        <div className="pt-2">
                            <p><span className="font-semibold">Steuernummer:</span> 37277/24219</p>
                        </div>
                        <div className="pt-4">
                            <p><span className="font-semibold">Web:</span> <a href="http://www.getraenke-mahringer.de"
                                                                              target="_blank" rel="noopener noreferrer"
                                                                              className="text-primary hover:underline">www.getraenke-mahringer.de</a>
                            </p>
                            <p className="text-sm mt-2 font-semibold">Das Impressum gilt für folgende Domains:</p>
                            <ul className="list-disc list-inside text-sm ml-2 text-gray-700">
                                <li>getraenke-mahringer.de</li>
                                <li>mahringer-getraenke.de</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-darkblue mb-4 border-b border-primary/20 pb-2">Öffnungszeiten</h2>
                    <div className="space-y-2">
                        <p className="font-semibold">Ladengeschäft:</p>
                        <p>Mittwochs, Donnerstags, Freitags: 14:00 - 18:00 Uhr</p>
                        <p className="mt-6 p-4 bg-primary/10 border-l-4 border-primary rounded-r-md italic text-sm">
                            Außerhalb dieser Zeiten sind wir telefonisch zu erreichen oder bitte auf unseren
                            Anrufbeantworter
                            sprechen.
                        </p>
                    </div>
                </section>
            </div>

            <section>
                <h2 className="text-2xl font-semibold text-darkblue mb-4 border-b border-primary/20 pb-2">Anfahrt</h2>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2589.921638560078!2d8.484628776950515!3d49.52375507143018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4797cde01a4cb2b9%3A0x38b225cb837b068d!2sGetr%C3%A4nkeservice%20Mahringer!5e0!3m2!1sde!2sde!4v1779535400247!5m2!1sde!2sde"
                    width="1000" height="500" style={{border: 0}} allowFullScreen={false} loading="lazy"
                    className="w-full mb-5"
                    referrerPolicy="no-referrer-when-downgrade"></iframe>
            </section>


            <section className="not-prose bg-white/50 p-8 rounded-xl shadow-sm border border-darkblue/5">
                <h2 className="text-3xl font-semibold text-darkblue mb-6">Kontaktformular</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-darkblue mb-1">Ihr Name
                                (Pflichtfeld)</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-darkblue mb-1">Ihre
                                E-Mail-Adresse
                                (Pflichtfeld)</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="website" className="block text-sm font-semibold text-darkblue mb-1">Ihre
                                Internet-Adresse</label>
                            <input
                                type="text"
                                id="website"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-semibold text-darkblue mb-1">Ihre
                                Telefonnummer</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="subject"
                               className="block text-sm font-semibold text-darkblue mb-1">Betreff</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Allgemeine Fragen"
                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-semibold text-darkblue mb-1">Ihre
                            Nachricht</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                        ></textarea>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-darkblue">Datenschutzhinweis</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            Ich stimme zu, dass meine Angaben aus dem Kontaktformular zur Beantwortung meiner Anfrage
                            erhoben und
                            verarbeitet werden. Die Daten werden nach abgeschlossener Bearbeitung Ihrer Anfrage
                            gelöscht. Hinweis:
                            Sie können Ihre Einwilligung jederzeit für die Zukunft per E-Mail an
                            bernd-mahringer@t-online.de
                            widerrufen. Detaillierte Informationen zum Umgang mit Nutzerdaten finden Sie in unserer
                            Datenschutzerklärung.
                        </p>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="acceptTerms"
                                name="acceptTerms"
                                required
                                checked={formData.acceptTerms}
                                onChange={handleChange}
                                className="h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
                            />
                            <label htmlFor="acceptTerms"
                                   className="ml-2 block text-sm font-medium text-darkblue cursor-pointer">
                                Akzeptieren
                            </label>
                        </div>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <button
                            type="submit"
                            className="bg-primary hover:bg-orange-600 text-white font-bold py-3 px-10 rounded-md shadow-md hover:shadow-lg transition-all duration-200 active:transform active:scale-95"
                        >
                            Absenden
                        </button>
                    </div>
                </form>
            </section>
            <p className="text-[10px] text-gray-500 italic max-w-xs leading-tight">
                Konzeption, Gestaltung und technische Realisation:
            </p>
        </div>
    );
}
