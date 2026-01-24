"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Partners() {
  const partners = [
    {
      name: "BIC",
      logo: "https://companieslogo.com/img/orig/BB.PA_BIG-5486796b.png?t=1720244490",
    },
    {
      name: "Crayola",
      logo: "https://th.bing.com/th/id/R.b9b7a37676473d90833e9288a4e97516?rik=2%2fin9Hx95bEnMw&pid=ImgRaw&r=0",
    },
    {
      name: "Moleskine",
      logo: "https://tse4.mm.bing.net/th/id/OIP.dE4dT_kjiYvmE30f4tKM0gHaAr?cb=defcache2defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      name: "HP",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg",
    },

    {
      name: "Xerox",
      logo: "https://tse4.mm.bing.net/th/id/OIP.j38gq4v4jsBDj8Tfv6PS4wHaFj?cb=defcache2defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    },

    {
      name: "Stabilo",
      logo: "https://th.bing.com/th/id/R.5f5b8fa3ace86edf4b72586afd52d7d4?rik=Z6yu6R%2bw2jEsGw&riu=http%3a%2f%2fgoodlogo.com%2fimages%2flogos%2fstabilo_logo_3141.gif&ehk=m0R1Sz56PkDtwresUqdJLyWCs8ULzPvRPAqlxogQClA%3d&risl=&pid=ImgRaw&r=0",
    },

    {
      name: "M&G",
      logo: "https://tse2.mm.bing.net/th/id/OIP.YLzserpOBsAhGxzeVqjAXwHaHa?cb=defcache2defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      name: "Post-it",
      logo: "https://tse2.mm.bing.net/th/id/OIP.VgJuDpEMFRtN7c9PUK0QewHaEs?cb=defcache2defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      name: "staedler",
      logo: "https://tse1.mm.bing.net/th/id/OIP.YSNWRKK1vDe1XmcDG8SjwgHaBw?cb=defcache2defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    },

    {
      name: "Canon",
      logo: "https://static.vecteezy.com/system/resources/previews/014/414/673/original/canon-logo-on-transparent-background-free-vector.jpg",
    },
    {
      name: "Epson",
      logo: "https://th.bing.com/th/id/R.d74dc63edd5f13537ea831a3fe1c84f5?rik=w3Hl%2fLOMDnLtwg&riu=http%3a%2f%2fdiscover.unilinkinc.com%2fwp-content%2fuploads%2f2017%2f12%2fEPSON-Logo.svg_.png&ehk=dtOARq6UGZbEbLLlo%2bKM%2fnWcBUf%2bo5Yk248mUcjfgNU%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      name: "Tetra Pak",
      logo: "https://th.bing.com/th/id/R.19c8285fd03408232700d6beeabf54cf?rik=MR1DLpBTVwI0VQ&pid=ImgRaw&r=0",
    },
  ];

  const extendedPartners = [...partners, ...partners];

  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="container mx-auto px-4 pt-20">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold Unbounded text-gray-900 whitespace-nowrap">
            Our Trusted Partners
          </h2>
          <p className="text-gray-600 mt-2">
            Trusted by 287+ million creatives, marketers,and businesses
          </p>
        </div>

        <div className="relative h-20 w-full overflow-hidden">
          <motion.div
            className="flex absolute left-0 space-x-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ width: "200%" }}
          >
            {extendedPartners.map((partner, index) => (
              <div key={index} className="shrink-0 h-16 w-32 relative">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain transition-all duration-300"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
