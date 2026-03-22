import { useState, useMemo, useRef } from "react";

const CAD_USD = 0.74;

const TRANSLATIONS = {
  EN: {
    nav_become: "Become a sitter", nav_login: {T.nav_login},
    hero_tag: {T.hero_tag},
    hero_h1a: "Go on vacation,", hero_h1b: "leave your pet in", hero_h1c: "loving hands",
    hero_p: "Connect with trusted, verified pet sitters across Canada. Sitters set their own prices, availability and conditions. You choose by rating, price and reviews.",
    hero_btn1: {T.hero_btn1}, hero_btn2: "Become a sitter",
    trust_main: "+1,200 verified sitters", trust_sub: "across Canada · Avg. rating 4.9★ · Payments via PayPal",
    stat1: "Verified sitters", stat2: "Happy pets", stat3: "Average rating", stat4: "Satisfied owners",
    search_city: "City", search_from: "Check-in", search_to: "Check-out", search_pet: "Pet type",
    sec_title: "Available Sitters", filter_label: {T.filter_label}, avail_now: {T.avail_now},
    has_yard: {T.has_yard}, meds: {T.meds}, sort_label: {T.sort_label}, sort1: {T.sort1},
    sort2: {T.sort2}, sort3: {T.sort3}, sort4: {T.sort4},
    no_sitters: {T.no_sitters}, no_sitters_sub: {T.no_sitters_sub},
    how_title: "How PawStay works", how_sub: {T.how_sub},
    how1_t: {T.how1_t}, how1_p: "Browse sitters by city, pet type, price and rating.",
    how2_t: {T.how2_t}, how2_p: "Choose your dates and send a request. The sitter confirms within hours.",
    how3_t: {T.how3_t}, how3_p: "Your sitter sends photos every day. After the stay, leave a review!",
    footer_sub: "Verified platform · Secure PayPal payments · Canada",
    modal_about: "About", modal_services: "Services & Pricing", modal_conditions: "Conditions & Rules",
    modal_avail: "Availability — April 2026", modal_reviews: "Reviews", modal_book: "Book a Stay",
    field_checkin: "Check-in", field_checkout: "Check-out", field_pet: "Pet type",
    field_service: "Service", field_msg: "Message to sitter",
    field_msg_ph: "Tell them about your pet — breed, age, habits, special needs...",
    btn_book: "Book Now", btn_book_empty: "Select dates to book",
    auth_title: "Welcome to PawStay", tab_owner: "🐾 I have a pet", tab_sitter: "🏠 I'm a sitter", tab_login: {T.nav_login},
    field_fname: "First name", field_lname: "Last name", field_email: "Email", field_phone: "Phone",
    field_pass: "Password", field_pets: "Your pets", btn_create: "Create free account", btn_signin: {T.nav_login},
    no_account: "No account? ", signup_link: "Sign up",
    sitter_reg_title: "Become a Sitter 🐾", field_city: "City", field_zone: "Neighborhood",
    field_price: "Your rate (CA$/night)", field_exp: "Years of experience",
    field_accepts: "Accepted pets", field_svcs: "Services offered",
    field_about_ph: "Describe your experience with animals, your space, garden, own pets...",
    paypal_note: "You keep 93% of each booking — PawStay retains a 7% platform fee.",
    btn_submit: "Submit application 🐾",
    submit_note: "Your application will be reviewed by the PawStay team within 24-48 hours.",
    night: "night", nights: "nights", yrs_exp: "yrs exp.",
    avail_y: "✓ Available", avail_n: "✗ Unavailable", verified: "✓ Verified",
    price_breakdown: "Price Breakdown", base_rate: "Sitter rate ×",
    service_fee: "Service fee (8%)", owner_fee_note: "charged to you",
    you_pay: "You pay total", sitter_gets: "Sitter receives", platform_earns: "PawStay earns (15% total)",
    secure_pay: "Secure payment via", city_all: {T.city_all}, pet_all: "All",
    srv_available: "Available", srv_na: "N/A",
  },
  FR: {
    nav_become: "Devenir gardien", nav_login: "Connexion",
    hero_tag: "#1 Plateforme de Gardiennage au Canada",
    hero_h1a: "Partez en vacances,", hero_h1b: "laissez votre animal en", hero_h1c: "bonnes mains",
    hero_p: "Connectez-vous avec des gardiens d'animaux vérifiés partout au Canada. Les gardiens fixent leurs propres prix, disponibilités et conditions. Vous choisissez selon les avis et la note.",
    hero_btn1: "Trouver un gardien 🔍", hero_btn2: "Devenir gardien",
    trust_main: "+1 200 gardiens vérifiés", trust_sub: "partout au Canada · Note moyenne 4,9★ · Paiements via PayPal",
    stat1: "Gardiens vérifiés", stat2: "Animaux heureux", stat3: "Note moyenne", stat4: "Propriétaires satisfaits",
    search_city: "Ville", search_from: "Arrivée", search_to: "Départ", search_pet: "Type d'animal",
    sec_title: "Gardiens disponibles", filter_label: "Filtrer :", avail_now: "Disponible maintenant",
    has_yard: "Cour clôturée", meds: "Médicaments OK", sort_label: "Trier :", sort1: "Recommandé",
    sort2: "Moins cher", sort3: "Note", sort4: "Plus d'avis",
    no_sitters: "Aucun gardien trouvé", no_sitters_sub: "Essayez de modifier vos filtres",
    how_title: "Comment fonctionne PawStay", how_sub: "Simple, transparent, fiable",
    how1_t: "Rechercher et filtrer", how1_p: "Parcourez les gardiens par ville, type d'animal, prix et note.",
    how2_t: "Réserver un séjour", how2_p: "Choisissez vos dates et envoyez une demande. Le gardien confirme en quelques heures.",
    how3_t: "Photos quotidiennes", how3_p: "Votre gardien envoie des photos chaque jour. Après le séjour, laissez un avis!",
    footer_sub: "Plateforme vérifiée · Paiements PayPal sécurisés · Canada",
    modal_about: "À propos", modal_services: "Services et tarifs", modal_conditions: "Conditions et règles",
    modal_avail: "Disponibilité — Avril 2026", modal_reviews: "Avis", modal_book: "Réserver un séjour",
    field_checkin: "Arrivée", field_checkout: "Départ", field_pet: "Type d'animal",
    field_service: "Service", field_msg: "Message au gardien",
    field_msg_ph: "Parlez de votre animal — race, âge, habitudes, besoins spéciaux...",
    btn_book: "Réserver", btn_book_empty: "Sélectionnez les dates",
    auth_title: "Bienvenue sur PawStay", tab_owner: "🐾 J'ai un animal", tab_sitter: "🏠 Je suis gardien", tab_login: "Connexion",
    field_fname: "Prénom", field_lname: "Nom", field_email: "Courriel", field_phone: "Téléphone",
    field_pass: "Mot de passe", field_pets: "Vos animaux", btn_create: "Créer un compte gratuit", btn_signin: "Se connecter",
    no_account: "Pas de compte ? ", signup_link: "S'inscrire",
    sitter_reg_title: "Devenir Gardien 🐾", field_city: "Ville", field_zone: "Quartier",
    field_price: "Votre tarif (CA$/nuit)", field_exp: "Années d'expérience",
    field_accepts: "Animaux acceptés", field_svcs: "Services proposés",
    field_about_ph: "Décrivez votre expérience avec les animaux, votre espace, jardin, animaux propres...",
    paypal_note: "Vous gardez 93% de chaque réservation — PawStay retient automatiquement 7%.",
    btn_submit: "Soumettre ma candidature 🐾",
    submit_note: "Votre candidature sera examinée par l'équipe PawStay dans les 24-48 heures.",
    night: "nuit", nights: "nuits", yrs_exp: "ans exp.",
    avail_y: "✓ Disponible", avail_n: "✗ Indisponible", verified: "✓ Vérifié",
    price_breakdown: "Détail du prix", base_rate: "Tarif gardien ×",
    service_fee: "Frais de service (8%)", owner_fee_note: "à votre charge",
    you_pay: "Vous payez au total", sitter_gets: "Le gardien reçoit", platform_earns: "PawStay gagne (15% total)",
    secure_pay: "Paiement sécurisé via", city_all: "Toutes les villes", pet_all: "Tous",
    srv_available: "Disponible", srv_na: "N/D",
  }
};



// ─── EMAILJS CONFIG ──────────────────────────────────────────────────────────
const EMAILJS_SERVICE  = "service_8lfa0t9";
const EMAILJS_TEMPLATE = "template_lbbuwtk";
const EMAILJS_KEY      = "gBgFz8uCFzzYCc4pv";

async function sendNotification(type, data) {
  try {
    await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id:  EMAILJS_SERVICE,
        template_id: EMAILJS_TEMPLATE,
        user_id:     EMAILJS_KEY,
        template_params: {
          name:    data.name    || "Unknown",
          message: data.message || "",
          type:    type,
        }
      })
    });
  } catch(e) { console.error("EmailJS error:", e); }
}

const OWNER_FEE = 0.08;
const SITTER_FEE = 0.07;

function fmtP(price, cur) {
  const v = cur === "USD" ? Math.round(price * CAD_USD) : price;
  return (cur === "USD" ? "US$" : "CA$") + v;
}
function Stars({ n }) {
  return <span style={{color:"#E09010",letterSpacing:1}}>{"★".repeat(Math.floor(n))}{"☆".repeat(5-Math.floor(n))}</span>;
}

const SITTERS = [
  { id:1, name:"Sarah Mitchell", avatar:"👩", city:"Toronto", zone:"The Annex",
    bio:"Animal lover 10+ years. Fenced backyard, photos twice daily. Your pet will feel right at home!", 
    price:45, rating:4.9, reviewCount:64, verified:true, available:true, experience:6,
    accepts:["Dog","Cat"], maxPets:2, hasYard:true, medicationOk:true,
    services:["Overnight stay","Home visits","Daily walks"],
    busyDays:[3,4,5,12,13,20,21], bg:"linear-gradient(135deg,#F5DEB3,#DEB887)",
    photos:[
      {url:"https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=80",caption:"Max enjoying the yard 🐕",pet:"Labrador",reviewer:"James R.",stars:5,date:"Mar 2026",text:"Max was so happy here! Photos every day, absolutely amazing sitter."},
      {url:"https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80",caption:"Luna exploring 🐈",pet:"Persian Cat",reviewer:"Emily T.",stars:5,date:"Feb 2026",text:"My shy cat felt right at home. Will definitely book again!"},
      {url:"https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80",caption:"Morning walk in the park 🌳",pet:"Golden Retriever",reviewer:"Mark S.",stars:4,date:"Jan 2026",text:"Very professional and responsive. Highly recommend Sarah."},
    ]
  },
  { id:2, name:"Lucas Tremblay", avatar:"👨", city:"Montreal", zone:"Plateau",
    bio:"Foster dad 5 years. Large fenced garden. Expert with anxious and special-needs dogs.",
    price:38, rating:4.8, reviewCount:41, verified:true, available:true, experience:5,
    accepts:["Dog"], maxPets:1, hasYard:true, medicationOk:false,
    services:["Overnight stay","Daily walks"],
    busyDays:[7,8,9,16,17,25,26], bg:"linear-gradient(135deg,#C8E0C0,#A8C8A0)",
    photos:[
      {url:"https://images.unsplash.com/photo-1568572933382-74d440642117?w=400&q=80",caption:"Rex in the garden 🌿",pet:"Husky",reviewer:"Sophie B.",stars:5,date:"Mar 2026",text:"My dog didn't want to leave! Incredible care and attention."},
      {url:"https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=400&q=80",caption:"Trail hike with Bruno 🏔️",pet:"German Shepherd",reviewer:"David F.",stars:4,date:"Feb 2026",text:"Reliable, great with large breeds. Very happy with the service."},
    ]
  },
  { id:3, name:"Dr. Ava Chen", avatar:"👩‍⚕️", city:"Vancouver", zone:"Kitsilano",
    bio:"Licensed vet. Accepts animals with diabetes, epilepsy, special medications. Clinic 5 min away for emergencies.",
    price:55, rating:5.0, reviewCount:29, verified:true, available:false, experience:9,
    accepts:["Dog","Cat","Bird"], maxPets:3, hasYard:false, medicationOk:true,
    services:["Overnight stay","Home visits","Daily walks","Grooming"],
    busyDays:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
    bg:"linear-gradient(135deg,#F0C8C0,#E0A898)",
    photos:[
      {url:"https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&q=80",caption:"Buddy post-checkup 💉",pet:"Dachshund",reviewer:"Rachel N.",stars:5,date:"Mar 2026",text:"Our diabetic dog got his insulin perfectly on time. Total professionalism!"},
      {url:"https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&q=80",caption:"Mochi resting comfortably 😴",pet:"Burmese Cat",reviewer:"Brian T.",stars:5,date:"Jan 2026",text:"Asthmatic cat got all treatment on schedule. We trust Ava completely."},
    ]
  },
  { id:4, name:"Jake Morrison", avatar:"🧑", city:"Calgary", zone:"Beltline",
    bio:"Final-year vet tech student. Affordable prices, tons of playtime guaranteed! Great with small & medium pets.",
    price:30, rating:4.7, reviewCount:22, verified:false, available:true, experience:2,
    accepts:["Dog","Cat"], maxPets:2, hasYard:false, medicationOk:false,
    services:["Overnight stay","Daily walks"],
    busyDays:[10,11,18,19], bg:"linear-gradient(135deg,#C0C8E8,#A0B0D8)",
    photos:[
      {url:"https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=400&q=80",caption:"Bella playing fetch ⚽",pet:"Bichon",reviewer:"Nina C.",stars:5,date:"Feb 2026",text:"Super responsible! My dog had the absolute best time with Jake."},
      {url:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&q=80",caption:"Whiskers napping 😸",pet:"Domestic Cat",reviewer:"Paul D.",stars:4,date:"Jan 2026",text:"Good with small cats, very communicative and caring."},
    ]
  },
  { id:5, name:"Laura Bennett", avatar:"👱‍♀️", city:"Ottawa", zone:"Westboro",
    bio:"11 years professional pet sitting. Large garden, pool with secure fence. Live camera 24/7. Internationally certified.",
    price:60, rating:4.95, reviewCount:78, verified:true, available:true, experience:11,
    accepts:["Dog","Cat","Rabbit"], maxPets:3, hasYard:true, medicationOk:true,
    services:["Overnight stay","Home visits","Daily walks","Grooming"],
    busyDays:[6,7,14,15], bg:"linear-gradient(135deg,#E8D8F0,#D0B8E0)",
    photos:[
      {url:"https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&q=80",caption:"Charlie in the garden 🌺",pet:"Labrador",reviewer:"Alex P.",stars:5,date:"Mar 2026",text:"Live cam was incredible — I could check on my dog any time of day!"},
      {url:"https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80",caption:"Duo morning run 🏃",pet:"Border Collies",reviewer:"Gab M.",stars:5,date:"Feb 2026",text:"Our dogs are literally in paradise at Laura's. We'll never use anyone else!"},
      {url:"https://images.unsplash.com/photo-1518155317743-a8ff43ea6a5f?w=400&q=80",caption:"Thumper exploring 🐇",pet:"Rabbit",reviewer:"Chris H.",stars:5,date:"Jan 2026",text:"Our rabbit was so well cared for. Laura is simply the best!"},
    ]
  },
  { id:6, name:"Tyler Nguyen", avatar:"👨‍🦱", city:"Edmonton", zone:"Glenora",
    bio:"Outdoor enthusiast & trail hiker. 2+ hours of outdoor time daily. Perfect for large, energetic dogs who love nature.",
    price:35, rating:4.85, reviewCount:33, verified:true, available:true, experience:5,
    accepts:["Dog"], maxPets:1, hasYard:true, medicationOk:false,
    services:["Overnight stay","Daily walks"],
    busyDays:[4,5,12,13,20,21], bg:"linear-gradient(135deg,#D8E8D0,#B8D0B0)",
    photos:[
      {url:"https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=400&q=80",caption:"Zeus on the trails 🏔️",pet:"Malinois",reviewer:"Tara B.",stars:5,date:"Mar 2026",text:"Dog came back exhausted and SO happy after 2 weeks hiking with Tyler!"},
    ]
  },
];

const CITIES = [{T.city_all},"Toronto","Montreal","Vancouver","Calgary","Ottawa","Edmonton"];
const PET_TYPES = ["Dog","Cat","Bird","Rabbit","Hamster"];
const SERVICES_LIST = ["Overnight stay","Home visits","Daily walks","Grooming"];


// ─── PAYMENT MODAL ──────────────────────────────────────────────────────────
function PaymentModal({ booking, onClose, onSuccess }) {
  const { sitter, nights, total, currency, ownerFee } = booking;
  const [method, setMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [card, setCard] = useState({ name:"", number:"", expiry:"", cvc:"" });
  const [errors, setErrors] = useState({});

  const fmtP = (amount) => {
    const v = currency === "USD" ? Math.round(amount * CAD_USD) : amount;
    return (currency === "USD" ? "US$" : "CA$") + v;
  };
  const base = sitter.price * nights;
  const fee = Math.round(base * ownerFee);
  const grand = base + fee;

  const fmtCard = v => v.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();
  const fmtExpiry = v => { const d=v.replace(/\D/g,"").slice(0,4); return d.length>=3?d.slice(0,2)+"/"+d.slice(2):d; };

  const validate = () => {
    const e={};
    if(!card.name.trim()) e.name="Required";
    if(card.number.replace(/\s/g,"").length<16) e.number="Invalid card number";
    if(card.expiry.length<5) e.expiry="Invalid expiry";
    if(card.cvc.length<3) e.cvc="Invalid CVC";
    setErrors(e);
    return Object.keys(e).length===0;
  };

  const simulate = (type) => {
    setLoading(true); setMethod(type);
    setTimeout(()=>{ setLoading(false); setSuccess(true);
      setTimeout(()=>{ onSuccess&&onSuccess(type); onClose(); },2500); },1800);
  };

  const payCss = `
    .po{position:fixed;inset:0;background:rgba(28,16,8,.58);backdrop-filter:blur(7px);z-index:400;display:flex;align-items:center;justify-content:center;padding:1rem;}
    .pm{background:#FFFEF9;border-radius:26px;width:100%;max-width:460px;border:1px solid #E5DDD0;overflow:hidden;animation:pr .25s ease;}
    @keyframes pr{from{transform:translateY(24px);opacity:0;}to{transform:translateY(0);opacity:1;}}
    .phd{padding:1.2rem 1.6rem .9rem;border-bottom:1px solid #E5DDD0;display:flex;justify-content:space-between;align-items:center;}
    .ptitle{font-family:'Playfair Display',serif;font-size:1.15rem;color:#2B1810;}
    .px{background:#EDE5D8;border:none;width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:.9rem;color:#2B1810;display:flex;align-items:center;justify-content:center;}
    .pbody{padding:1.4rem 1.6rem;}
    .psum{background:#F7F2EA;border-radius:14px;padding:.95rem 1.1rem;margin-bottom:1.3rem;border:1px solid #E5DDD0;}
    .prow{display:flex;justify-content:space-between;font-size:.83rem;color:#7A6858;margin-bottom:.3rem;}
    .prow.tot{font-weight:700;color:#2B1810;font-size:.94rem;border-top:1px dashed #D5CCC0;padding-top:.45rem;margin-top:.3rem;}
    .pbadge{display:inline-flex;align-items:center;gap:5px;background:#E8F0E4;color:#4A6741;border-radius:100px;padding:3px 10px;font-size:.67rem;font-weight:700;margin-top:.45rem;}
    .express{display:grid;grid-template-columns:1fr 1fr;gap:.55rem;margin-bottom:1.1rem;}
    .apple-btn{width:100%;padding:.82rem;background:#000;color:#fff;border:none;border-radius:12px;font-size:.9rem;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:.4rem;transition:opacity .18s;}
    .apple-btn:hover{opacity:.85;}
    .gpay-btn{width:100%;padding:.82rem;background:#fff;color:#2B1810;border:2px solid #E5DDD0;border-radius:12px;font-size:.9rem;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:.3rem;transition:all .18s;}
    .gpay-btn:hover{border-color:#4285F4;}
    .divid{display:flex;align-items:center;gap:.6rem;margin:.8rem 0;color:#B0A090;font-size:.72rem;}
    .divid::before,.divid::after{content:'';flex:1;height:1px;background:#E5DDD0;}
    .cicons{display:flex;gap:.35rem;margin-bottom:.85rem;}
    .cicon{background:#F7F2EA;border:1px solid #E5DDD0;border-radius:6px;padding:.2rem .5rem;font-size:.7rem;font-weight:700;color:#2B1810;}
    .sff{margin-bottom:.6rem;}
    .sff label{display:block;font-size:.6rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#7A6858;margin-bottom:3px;}
    .sff input{width:100%;padding:.62rem .82rem;border:1.5px solid #E5DDD0;border-radius:10px;font-size:.88rem;color:#2B1810;background:#fff;font-family:'Plus Jakarta Sans',sans-serif;outline:none;transition:border-color .2s;}
    .sff input:focus{border-color:#C96A18;}
    .sff input.err{border-color:#B84A2E;}
    .errtxt{color:#B84A2E;font-size:.67rem;margin-top:2px;}
    .sfrow{display:grid;grid-template-columns:1fr 1fr;gap:.6rem;}
    .card-pay-btn{width:100%;padding:.85rem;background:#C96A18;color:#fff;border:none;border-radius:13px;font-size:.93rem;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:.5rem;transition:all .18s;margin-top:.75rem;}
    .card-pay-btn:hover{background:#E07820;transform:translateY(-1px);}
    .card-pay-btn:disabled{opacity:.5;cursor:not-allowed;transform:none;}
    .pp-btn{width:100%;padding:.85rem;background:#FFC439;color:#003087;border:none;border-radius:13px;font-size:.93rem;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:.5rem;transition:all .18s;}
    .pp-btn:hover{background:#FFB800;transform:translateY(-1px);}
    .secnote{display:flex;align-items:center;justify-content:center;gap:.4rem;font-size:.68rem;color:#7A6858;margin-top:.8rem;}
    .spin{width:18px;height:18px;border:2.5px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:sp .7s linear infinite;}
    @keyframes sp{to{transform:rotate(360deg);}}
    .psuccess{text-align:center;padding:2.5rem 1rem;}
    .psuccess-icon{font-size:4rem;margin-bottom:1rem;}
    .psuccess-title{font-family:'Playfair Display',serif;font-size:1.4rem;color:#2B1810;margin-bottom:.5rem;}
    .psuccess-sub{font-size:.86rem;color:#7A6858;line-height:1.7;}
  `;

  if (success) return (
    <div className="po"><style>{payCss}</style>
      <div className="pm"><div className="psuccess">
        <div className="psuccess-icon">🐾</div>
        <div className="psuccess-title">Booking Confirmed!</div>
        <div className="psuccess-sub">Your stay with <strong>{sitter.name}</strong> is confirmed!<br/>Check your email for details.<br/><br/>{sitter.name} will contact you within 2–4 hours. 🎉</div>
      </div></div>
    </div>
  );

  return (
    <div className="po" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <style>{payCss}</style>
      <div className="pm">
        <div className="phd"><span className="ptitle">Complete Booking</span><button className="px" onClick={onClose}>✕</button></div>
        <div className="pbody">

          <div className="psum">
            <div className="prow"><span>{sitter.name} × {nights} night{nights>1?"s":""}</span><span>{fmtP(base)}</span></div>
            <div className="prow"><span>Service fee (8%)</span><span>+{fmtP(fee)}</span></div>
            <div className="prow tot"><span>Total</span><span>{fmtP(grand)}</span></div>
            <div className="pbadge">🛡 Refundable 48h before check-in</div>
          </div>

          <div className="express">
            <button className="apple-btn" onClick={()=>simulate("apple")} disabled={loading}>
              {loading&&method==="apple"?<div className="spin"/>:<><span>🍎</span> Apple Pay</>}
            </button>
            <button className="gpay-btn" onClick={()=>simulate("google")} disabled={loading}>
              {loading&&method==="google"
                ?<div className="spin" style={{borderColor:"rgba(0,0,0,.15)",borderTopColor:"#4285F4"}}/>
                :<><span style={{fontWeight:900,color:"#4285F4"}}>G</span><span style={{fontWeight:900,color:"#FBBC05"}}>P</span><span style={{fontWeight:900,color:"#34A853"}}>a</span><span style={{fontWeight:900,color:"#EA4335"}}>y</span></>}
            </button>
          </div>

          <div className="divid">or pay by card</div>

          <div className="cicons">{["VISA","MC","AMEX","INTERAC"].map(c=><div key={c} className="cicon">{c}</div>)}</div>

          <div className="sff">
            <label>Cardholder name</label>
            <input className={errors.name?"err":""} placeholder="Jane Smith" value={card.name} onChange={e=>setCard({...card,name:e.target.value})}/>
            {errors.name&&<div className="errtxt">{errors.name}</div>}
          </div>
          <div className="sff">
            <label>Card number</label>
            <input className={errors.number?"err":""} placeholder="1234 5678 9012 3456" value={card.number} onChange={e=>setCard({...card,number:fmtCard(e.target.value)})} maxLength={19}/>
            {errors.number&&<div className="errtxt">{errors.number}</div>}
          </div>
          <div className="sfrow">
            <div className="sff" style={{marginBottom:0}}>
              <label>Expiry</label>
              <input className={errors.expiry?"err":""} placeholder="MM/YY" value={card.expiry} onChange={e=>setCard({...card,expiry:fmtExpiry(e.target.value)})} maxLength={5}/>
              {errors.expiry&&<div className="errtxt">{errors.expiry}</div>}
            </div>
            <div className="sff" style={{marginBottom:0}}>
              <label>CVC</label>
              <input className={errors.cvc?"err":""} placeholder="123" value={card.cvc} onChange={e=>setCard({...card,cvc:e.target.value.replace(/\D/g,"").slice(0,4)})} maxLength={4}/>
              {errors.cvc&&<div className="errtxt">{errors.cvc}</div>}
            </div>
          </div>
          <button className="card-pay-btn" onClick={()=>{if(validate())simulate("stripe");}} disabled={loading&&method==="stripe"}>
            {loading&&method==="stripe"?<div className="spin"/>:<>🔒 Pay {fmtP(grand)} with Card</>}
          </button>

          <div className="divid">or</div>

          <button className="pp-btn" onClick={()=>simulate("paypal")} disabled={loading}>
            {loading&&method==="paypal"?<div className="spin" style={{borderColor:"rgba(0,51,135,.2)",borderTopColor:"#003087"}}/>
              :<><span style={{fontSize:"1.1rem"}}>🅿</span><span style={{color:"#003087",fontWeight:900}}>Pay</span><span style={{color:"#009CDE",fontWeight:900}}>Pal</span></>}
          </button>

          <div className="secnote">🔒 256-bit SSL · Stripe + PayPal · PCI DSS compliant</div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [sitters, setSitters] = useState(SITTERS);
  const [currency, setCurrency] = useState("CAD");
  const [lang, setLang] = useState("EN");
  const T = TRANSLATIONS[lang];
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isSitter, setIsSitter] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [toast, setToast] = useState(null);
  const [filterCity, setFilterCity] = useState({T.city_all});
  const [filterPet, setFilterPet] = useState("All");
  const [filterAvail, setFilterAvail] = useState(false);
  const [filterYard, setFilterYard] = useState(false);
  const [filterMed, setFilterMed] = useState(false);
  const [sortBy, setSortBy] = useState({T.sort1});
  const [search, setSearch] = useState({ from:"", to:"", pet:"All" });
  const [photoModal, setPhotoModal] = useState(null);
  const [reviewForm, setReviewForm] = useState({ sitterId:null, stars:5, text:"", pet:"", photo:null });
  const fileRef = useRef();

  const showToast = (msg, ok=true) => { setToast({msg,ok}); setTimeout(()=>setToast(null),3500); };
  const openSitter = s => { setSelected(s); setModal("sitter"); };

  const nights = useMemo(() => {
    if (!search.from || !search.to) return 0;
    return Math.max(0, Math.ceil((new Date(search.to)-new Date(search.from))/86400000));
  }, [search]);

  const filtered = useMemo(() => {
    let list = [...sitters];
    if (filterCity !== {T.city_all}) list = list.filter(s => s.city === filterCity);
    if (filterPet !== "All") list = list.filter(s => s.accepts.includes(filterPet));
    if (filterAvail) list = list.filter(s => s.available);
    if (filterYard) list = list.filter(s => s.hasYard);
    if (filterMed) list = list.filter(s => s.medicationOk);
    if (sortBy === {T.sort2}) list.sort((a,b) => a.price-b.price);
    else if (sortBy === "Most expensive") list.sort((a,b) => b.price-a.price);
    else if (sortBy === {T.sort3}) list.sort((a,b) => b.rating-a.rating);
    else if (sortBy === {T.sort4}) list.sort((a,b) => b.reviewCount-a.reviewCount);
    return list;
  }, [sitters, filterCity, filterPet, filterAvail, filterYard, filterMed, sortBy]);

  const handleBook = () => {
    if (!loggedIn) { setModal("auth"); return; }
    if (nights < 1) { showToast("Please select check-in and check-out dates!", false); return; }
    if (!selected.available) { showToast("This sitter is not available right now.", false); return; }
    const base = selected.price * nights;
    const fee = Math.round(base * OWNER_FEE);
    setPaymentData({
      sitter: selected,
      nights,
      total: base + fee,
      currency,
      ownerFee: OWNER_FEE,
    });
    setModal("payment");
  };
  
  const handlePaymentSuccess = (method) => {
    setPaymentData(null);
    setModal(null);
    const labels = { stripe:"card", apple:"Apple Pay", google:"Google Pay", paypal:"PayPal" };
    sendNotification("📅 New Booking Confirmed", {
      name: selected?.name || "Unknown sitter",
      message: `Payment: ${labels[method]||method} | Nights: ${paymentData?.nights} | Total: CA$${paymentData?.total}`,
    });
    showToast(`✓ Booking confirmed via ${labels[method]||method}! ${selected?.name} will contact you soon. 🐾`);
  };

  const handleLogin = (name, asSitter) => {
    setLoggedIn(true); setUserName(name); setIsSitter(asSitter);
    sendNotification(asSitter ? "🐾 New Sitter Account" : "👤 New Owner Account", {
      name: name,
      message: `Account type: ${asSitter ? "Sitter" : "Pet Owner"}`,
    });
    setModal(null);
    showToast(`Welcome, ${name}! ${asSitter ? "🐾 Your sitter dashboard is ready." : "Find the perfect sitter 🔍"}`);
  };

  const submitReview = () => {
    if (!reviewForm.text.trim()) { showToast("Please write a review!", false); return; }
    setSitters(prev => prev.map(s => {
      if (s.id !== reviewForm.sitterId) return s;
      const newPhoto = { url: reviewForm.photo || "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80", caption: `${reviewForm.pet} 🐾`, pet: reviewForm.pet, reviewer: userName, stars: reviewForm.stars, date: "Apr 2026", text: reviewForm.text };
      const newRating = ((s.rating * s.reviewCount) + reviewForm.stars) / (s.reviewCount + 1);
      return { ...s, photos: [newPhoto, ...s.photos], rating: Math.round(newRating*10)/10, reviewCount: s.reviewCount+1 };
    }));
    setModal(null);
    showToast("✓ Your review and photo have been published! Thank you.");
    sendNotification("⭐ New Review Posted", {
      name: userName,
      message: `Rating: ${reviewForm.stars}/5 stars | Pet: ${reviewForm.pet} | Review: ${reviewForm.text}`,
    });
  };

  const submitSitterProfile = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const newSitter = {
      id: Date.now(), name: fd.get("name"), avatar: "🧑", city: fd.get("city"), zone: fd.get("zone"),
      bio: fd.get("bio"), price: Number(fd.get("price")), rating: 0, reviewCount: 0,
      verified: false, available: true, experience: Number(fd.get("exp")),
      accepts: PET_TYPES.filter(p => fd.get("pet_"+p)), maxPets: Number(fd.get("maxpets")||1),
      hasYard: fd.get("yard")==="on", medicationOk: fd.get("med")==="on",
      services: SERVICES_LIST.filter(sv => fd.get("srv_"+sv)),
      busyDays: [], bg: "linear-gradient(135deg,#E8E0D8,#D0C8C0)", photos: [],
    };
    setSitters(prev => [newSitter, ...prev]);
    setModal(null);
    showToast("✓ Your sitter profile is now live! 🐾");
    sendNotification("🏠 New Sitter Registered", {
      name: newSitter.name,
      message: `City: ${newSitter.city} | Zone: ${newSitter.zone} | Price: CA$${newSitter.price}/night | Accepts: ${newSitter.accepts.join(", ")} | Services: ${newSitter.services.join(", ")}`,
    });
  };

  // ── STYLES ──
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,500&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    :root{--bg:#F7F2EA;--card:#FFFEF9;--br:#E5DDD0;--brown:#2B1810;--amb:#C96A18;--amb2:#E07820;--sage:#4A6741;--rose:#B84A2E;--mu:#7A6858;--li:#EDE5D8;}
    body{font-family:'Plus Jakarta Sans',sans-serif;background:var(--bg);color:var(--brown);}
    button{font-family:'Plus Jakarta Sans',sans-serif;cursor:pointer;}
    img{display:block;width:100%;height:100%;object-fit:cover;}
    nav{position:sticky;top:0;z-index:100;background:rgba(247,242,234,.96);backdrop-filter:blur(12px);border-bottom:1px solid var(--br);display:flex;align-items:center;justify-content:space-between;padding:0 2rem;height:64px;gap:1rem;}
    .logo{font-family:'Playfair Display',serif;font-size:1.4rem;color:var(--brown);white-space:nowrap;}
    .logo span{color:var(--amb);}
    .nav-r{display:flex;gap:.5rem;align-items:center;flex-wrap:wrap;}
    .cur-tog{display:flex;background:var(--li);border-radius:100px;padding:3px;gap:2px;}
    .cur-btn{border:none;border-radius:100px;padding:.28rem .75rem;font-size:.75rem;font-weight:700;background:none;color:var(--mu);transition:all .18s;}
    .cur-btn.on{background:var(--amb);color:#fff;}
    .btn{border:none;border-radius:100px;padding:.46rem 1.1rem;font-size:.82rem;font-weight:600;transition:all .18s;}
    .btn-gh{background:none;color:var(--brown);border:1.5px solid var(--br);}
    .btn-gh:hover{border-color:var(--amb);}
    .btn-a{background:var(--amb);color:#fff;}
    .btn-a:hover{background:var(--amb2);transform:translateY(-1px);}
    .btn-sage{background:var(--sage);color:#fff;}
    .btn-sage:hover{opacity:.9;}
    .btn-lg{padding:.7rem 1.8rem;font-size:.95rem;}
    .btn-full{width:100%;padding:.82rem;border-radius:14px;font-size:.93rem;}
    /* HERO */
    .hero{max-width:1160px;margin:0 auto;padding:3.5rem 2rem 2.5rem;display:grid;grid-template-columns:1.1fr 1fr;gap:4rem;align-items:center;}
    .hero-tag{display:inline-flex;align-items:center;gap:6px;background:var(--li);border:1px solid var(--br);border-radius:100px;padding:4px 14px;font-size:.72rem;font-weight:700;color:var(--amb);letter-spacing:.04em;margin-bottom:1.1rem;}
    .hero h1{font-family:'Playfair Display',serif;font-size:clamp(2rem,4vw,3.2rem);line-height:1.12;margin-bottom:1rem;}
    .hero h1 i{color:var(--amb);font-style:italic;}
    .hero p{color:var(--mu);line-height:1.8;margin-bottom:1.6rem;font-size:.96rem;}
    .hero-btns{display:flex;gap:.8rem;flex-wrap:wrap;}
    .trust{display:flex;align-items:center;gap:.75rem;margin-top:1.5rem;}
    .tavs{display:flex;}
    .tav{width:28px;height:28px;border-radius:50%;border:2px solid var(--bg);background:var(--li);display:flex;align-items:center;justify-content:center;font-size:.8rem;margin-left:-6px;}
    .tav:first-child{margin-left:0;}
    .trust-txt{font-size:.76rem;color:var(--mu);line-height:1.45;}
    .trust-txt strong{color:var(--brown);display:block;}
    .hero-vis{display:flex;justify-content:center;position:relative;}
    .hcard{background:var(--card);border-radius:22px;width:260px;border:1px solid var(--br);box-shadow:0 18px 56px rgba(43,24,16,.13);overflow:hidden;}
    .hcard-img{height:165px;position:relative;overflow:hidden;}
    .hcard-body{padding:.85rem 1rem 1rem;}
    .hcard-name{font-family:'Playfair Display',serif;font-size:.95rem;font-weight:700;}
    .hcard-loc{font-size:.7rem;color:var(--mu);margin:.15rem 0 .5rem;}
    .hcard-ft{display:flex;justify-content:space-between;align-items:center;}
    .hcard-price{font-weight:700;color:var(--amb);font-size:.85rem;}
    .fl1{position:absolute;top:0;right:-12px;background:var(--card);border-radius:12px;padding:.55rem .85rem;font-size:.73rem;font-weight:600;border:1px solid var(--br);box-shadow:0 4px 16px rgba(43,24,16,.1);white-space:nowrap;}
    .fl2{position:absolute;bottom:5px;left:-18px;background:var(--sage);color:#fff;border-radius:12px;padding:.55rem .85rem;font-size:.73rem;font-weight:600;white-space:nowrap;}
    /* SEARCH */
    .search-wrap{max-width:980px;margin:0 auto;padding:0 2rem 2.5rem;}
    .sbar{background:var(--card);border-radius:18px;box-shadow:0 4px 24px rgba(43,24,16,.08);border:1.5px solid var(--br);display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr auto;overflow:hidden;}
    .sf{padding:.85rem 1.1rem;border-right:1px solid var(--br);}
    .sf label{display:block;font-size:.58rem;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--mu);margin-bottom:4px;}
    .sf input,.sf select{width:100%;border:none;outline:none;font-size:.86rem;color:var(--brown);background:transparent;font-family:'Plus Jakarta Sans',sans-serif;}
    .go-btn{background:var(--amb);color:#fff;border:none;padding:0 1.5rem;font-size:1.25rem;}
    .go-btn:hover{background:var(--amb2);}
    /* STATS */
    .stats{max-width:980px;margin:0 auto 3.5rem;padding:0 2rem;display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;}
    .stat{background:var(--card);border-radius:16px;padding:1.1rem 1.3rem;border:1px solid var(--br);text-align:center;}
    .stat-n{font-family:'Playfair Display',serif;font-size:1.8rem;color:var(--amb);}
    .stat-l{font-size:.7rem;color:var(--mu);margin-top:3px;}
    /* SECTION */
    .sec{max-width:1160px;margin:0 auto;padding:0 2rem 3.5rem;}
    .sec-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.2rem;}
    .sec-title{font-family:'Playfair Display',serif;font-size:1.55rem;}
    .sec-meta{font-size:.8rem;color:var(--mu);}
    /* FILTERS */
    .filters{display:flex;gap:.45rem;flex-wrap:wrap;margin-bottom:1.3rem;align-items:center;}
    .flbl{font-size:.74rem;font-weight:700;color:var(--mu);}
    .fc{background:var(--card);border:1.5px solid var(--br);border-radius:100px;padding:.34rem .9rem;font-size:.76rem;font-weight:600;color:var(--mu);transition:all .18s;white-space:nowrap;}
    .fc:hover{border-color:var(--amb);color:var(--brown);}
    .fc.on{background:var(--amb);border-color:var(--amb);color:#fff;}
    /* GRID */
    .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(255px,1fr));gap:1.25rem;}
    /* SITTER CARD */
    .scard{background:var(--card);border-radius:20px;overflow:hidden;border:1px solid var(--br);transition:transform .22s,box-shadow .22s;cursor:pointer;}
    .scard:hover{transform:translateY(-5px);box-shadow:0 18px 44px rgba(43,24,16,.11);}
    .scard-img{height:175px;position:relative;overflow:hidden;}
    .scard-img-bg{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:5rem;}
    .avl{position:absolute;top:10px;right:10px;border-radius:100px;padding:3px 10px;font-size:.64rem;font-weight:700;background:rgba(255,255,255,.92);}
    .avl-y{color:var(--sage);}
    .avl-n{color:var(--rose);}
    .scard-body{padding:.9rem 1.05rem 1.1rem;}
    .scard-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:2px;}
    .scard-name{font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;}
    .scard-price{font-weight:700;color:var(--amb);font-size:.86rem;}
    .scard-price small{font-weight:400;color:var(--mu);font-size:.63rem;}
    .scard-loc{font-size:.71rem;color:var(--mu);margin-bottom:.55rem;}
    .tags{display:flex;gap:4px;flex-wrap:wrap;margin-bottom:.6rem;}
    .tag{border-radius:100px;padding:2px 8px;font-size:.65rem;font-weight:600;}
    .t-a{background:#FDF0E0;color:var(--amb);}
    .t-s{background:#E8F0E4;color:var(--sage);}
    .t-r{background:#FAE8E4;color:var(--rose);}
    .scard-ft{display:flex;align-items:center;justify-content:space-between;}
    .vbdg{font-size:.63rem;color:var(--sage);font-weight:600;background:#E8F0E4;border-radius:100px;padding:2px 8px;}
    /* PHOTO STRIP */
    .photo-strip{display:flex;gap:6px;padding:.75rem 1rem;border-top:1px solid var(--br);overflow-x:auto;}
    .photo-thumb{width:52px;height:52px;border-radius:8px;overflow:hidden;flex-shrink:0;cursor:pointer;border:2px solid transparent;transition:border-color .18s;}
    .photo-thumb:hover{border-color:var(--amb);}
    /* MODAL */
    .overlay{position:fixed;inset:0;background:rgba(28,16,8,.55);backdrop-filter:blur(6px);z-index:200;display:flex;align-items:center;justify-content:center;padding:1rem;}
    .modal{background:var(--card);border-radius:26px;width:100%;max-width:720px;max-height:93vh;overflow-y:auto;border:1px solid var(--br);}
    .mhd{position:sticky;top:0;background:var(--card);z-index:5;padding:1.2rem 1.65rem .85rem;border-bottom:1px solid var(--br);display:flex;justify-content:space-between;align-items:center;}
    .mtitle{font-family:'Playfair Display',serif;font-size:1.2rem;}
    .xbtn{background:var(--li);border:none;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.9rem;color:var(--brown);}
    .xbtn:hover{background:var(--br);}
    .mbody{padding:1.65rem;}
    /* SITTER DETAIL */
    .shero{display:flex;gap:1.2rem;margin-bottom:1.5rem;}
    .sav{width:84px;height:84px;border-radius:50%;font-size:2.6rem;flex-shrink:0;display:flex;align-items:center;justify-content:center;border:3px solid var(--br);}
    .smeta h2{font-family:'Playfair Display',serif;font-size:1.4rem;}
    .sloc{font-size:.78rem;color:var(--mu);margin:.2rem 0 .5rem;}
    .sbadges{display:flex;gap:.4rem;flex-wrap:wrap;}
    .sb{font-size:.66rem;font-weight:600;border-radius:100px;padding:3px 9px;border:1px solid;}
    .sb-s{color:var(--sage);background:#E8F0E4;border-color:#C8E0C4;}
    .sb-a{color:var(--amb);background:#FDF0E0;border-color:#F0D0A0;}
    .sb-r{color:var(--rose);background:#FAE8E4;border-color:#F0C8BE;}
    .dlbl{font-size:.63rem;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--mu);margin:.1rem 0 .6rem;}
    .abtxt{font-size:.87rem;line-height:1.78;color:var(--brown);}
    /* SERVICES */
    .srv-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:.55rem;margin-bottom:1.4rem;}
    .srv-item{border:1.5px solid var(--br);border-radius:12px;padding:.62rem .9rem;font-size:.82rem;display:flex;align-items:center;gap:8px;}
    .srv-item.on{border-color:var(--amb);background:#FDF8F2;}
    /* CONDITIONS */
    .conds{display:flex;flex-direction:column;gap:.45rem;margin-bottom:1.4rem;}
    .cond{display:flex;align-items:center;gap:8px;font-size:.82rem;}
    .cdot{width:7px;height:7px;border-radius:50%;flex-shrink:0;}
    .cy{background:var(--sage);}
    .cn{background:var(--rose);}
    /* CALENDAR */
    .cal-wrap{margin-bottom:1.4rem;}
    .cal-days{display:grid;grid-template-columns:repeat(7,1fr);gap:3px;}
    .cal-hdr{font-size:.58rem;text-align:center;color:var(--mu);font-weight:700;text-transform:uppercase;padding:2px 0;}
    .cal-day{aspect-ratio:1;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:.72rem;font-weight:500;}
    .cal-a{background:#E8F0E4;color:var(--sage);}
    .cal-b{background:#FAE8E4;color:var(--rose);}
    /* PHOTO GALLERY */
    .gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:.6rem;margin-bottom:1.4rem;}
    .gallery-item{border-radius:12px;overflow:hidden;cursor:pointer;position:relative;aspect-ratio:1;}
    .gallery-item:hover .gallery-overlay{opacity:1;}
    .gallery-overlay{position:absolute;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:flex-end;padding:.5rem;opacity:0;transition:opacity .2s;}
    .gallery-caption{font-size:.68rem;color:#fff;font-weight:500;line-height:1.3;}
    /* REVIEWS */
    .reviews-list{display:flex;flex-direction:column;gap:.85rem;margin-bottom:1.4rem;}
    .rv{background:var(--bg);border-radius:13px;padding:.9rem;border:1px solid var(--br);display:grid;grid-template-columns:64px 1fr;gap:.75rem;}
    .rv-photo{width:64px;height:64px;border-radius:10px;overflow:hidden;flex-shrink:0;}
    .rv-right{}
    .rv-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:.2rem;}
    .rv-author{font-size:.8rem;font-weight:700;}
    .rv-date{font-size:.68rem;color:var(--mu);}
    .rv-pet{font-size:.68rem;color:var(--amb);font-weight:600;margin-bottom:.3rem;}
    .rv-txt{font-size:.8rem;color:var(--mu);line-height:1.6;}
    /* BOOKING */
    .book-box{background:var(--bg);border-radius:16px;padding:1.25rem;border:1px solid var(--br);}
    .brow{display:grid;grid-template-columns:1fr 1fr;gap:.65rem;margin-bottom:.65rem;}
    .ff label{display:block;font-size:.6rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--mu);margin-bottom:4px;}
    .ff input,.ff select,.ff textarea{width:100%;padding:.6rem .8rem;border:1.5px solid var(--br);border-radius:11px;font-size:.86rem;color:var(--brown);background:var(--card);font-family:'Plus Jakarta Sans',sans-serif;outline:none;transition:border-color .2s;}
    .ff input:focus,.ff select:focus,.ff textarea:focus{border-color:var(--amb);}
    .ff textarea{min-height:68px;resize:vertical;}
    .price-bd{background:var(--card);border-radius:13px;border:1px solid var(--br);overflow:hidden;margin-top:.85rem;}
    .pr{display:flex;justify-content:space-between;align-items:center;padding:.55rem .9rem;font-size:.81rem;border-bottom:1px solid var(--br);}
    .pr:last-child{border-bottom:none;}
    .pr.hd{background:var(--li);font-weight:700;font-size:.75rem;}
    .pr.tot{font-weight:700;font-size:.92rem;background:var(--li);}
    .paypal-bar{background:#003087;color:#fff;padding:.65rem 1rem;display:flex;align-items:center;gap:.5rem;font-size:.8rem;}
    /* AUTH / FORMS */
    .tabs{display:flex;gap:4px;background:var(--bg);border-radius:12px;padding:4px;margin-bottom:1.3rem;}
    .tab{flex:1;padding:.55rem;border:none;background:none;border-radius:9px;font-size:.83rem;font-weight:500;color:var(--mu);transition:all .2s;}
    .tab.on{background:var(--card);color:var(--brown);font-weight:700;box-shadow:0 2px 8px rgba(0,0,0,.06);}
    .fg{margin-bottom:.85rem;}
    .fg label{display:block;font-size:.74rem;font-weight:600;color:var(--brown);margin-bottom:5px;}
    .fg input,.fg select,.fg textarea{width:100%;padding:.65rem .88rem;border:1.5px solid var(--br);border-radius:12px;font-size:.88rem;color:var(--brown);background:var(--card);font-family:'Plus Jakarta Sans',sans-serif;outline:none;transition:border-color .2s;}
    .fg input:focus,.fg select:focus{border-color:var(--amb);}
    .fg textarea{min-height:75px;resize:vertical;}
    .fg-2{display:grid;grid-template-columns:1fr 1fr;gap:.65rem;}
    .cbg{display:flex;gap:.4rem;flex-wrap:wrap;}
    .cbi{padding:4px 10px;border:1.5px solid var(--br);border-radius:100px;font-size:.76rem;font-weight:500;cursor:pointer;transition:all .18s;user-select:none;}
    .cbi.on{border-color:var(--amb);background:#FDF8F2;color:var(--amb);}
    .toggle-row{display:flex;align-items:center;justify-content:space-between;padding:.6rem .85rem;background:var(--bg);border-radius:11px;border:1.5px solid var(--br);margin-bottom:.65rem;font-size:.84rem;}
    .toggle-row input{width:18px;height:18px;accent-color:var(--amb);}
    /* PHOTO LIGHTBOX */
    .lightbox{position:fixed;inset:0;background:rgba(0,0,0,.88);z-index:300;display:flex;align-items:center;justify-content:center;padding:1rem;}
    .lb-inner{max-width:680px;width:100%;background:var(--card);border-radius:20px;overflow:hidden;}
    .lb-img{height:380px;overflow:hidden;}
    .lb-info{padding:1rem 1.25rem;}
    .lb-caption{font-family:'Playfair Display',serif;font-size:1.05rem;font-weight:600;}
    .lb-reviewer{font-size:.78rem;color:var(--mu);margin:.25rem 0 .5rem;}
    .lb-text{font-size:.84rem;color:var(--brown);line-height:1.65;}
    /* STAR PICKER */
    .star-pick{display:flex;gap:4px;margin-bottom:.65rem;}
    .star-pick span{font-size:1.6rem;cursor:pointer;transition:transform .15s;}
    .star-pick span:hover{transform:scale(1.2);}
    /* HOW */
    .how{background:var(--brown);padding:4rem 2rem;margin-bottom:3.5rem;}
    .how-in{max-width:1100px;margin:0 auto;}
    .how-title{font-family:'Playfair Display',serif;font-size:1.9rem;color:#fff;text-align:center;margin-bottom:.4rem;}
    .how-sub{text-align:center;color:rgba(255,255,255,.4);margin-bottom:2.5rem;font-size:.86rem;}
    .how-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.4rem;}
    .how-step{padding:1.6rem;background:rgba(255,255,255,.04);border-radius:18px;border:1px solid rgba(255,255,255,.08);text-align:center;}
    .how-ico{width:52px;height:52px;background:var(--amb);border-radius:50%;margin:0 auto 1rem;display:flex;align-items:center;justify-content:center;font-size:1.35rem;}
    .how-step h3{font-family:'Playfair Display',serif;color:#fff;font-size:1rem;margin-bottom:.4rem;}
    .how-step p{font-size:.78rem;color:rgba(255,255,255,.38);line-height:1.65;}
    /* TOAST */
    .toast{position:fixed;bottom:2rem;right:2rem;border-radius:14px;padding:.85rem 1.35rem;font-size:.84rem;z-index:500;box-shadow:0 8px 28px rgba(0,0,0,.2);display:flex;align-items:center;gap:8px;max-width:340px;font-weight:500;color:#fff;}
    .tok{background:var(--sage);}
    .terr{background:var(--rose);}
    footer{background:var(--brown);padding:2.25rem 2rem;text-align:center;color:rgba(255,255,255,.28);font-size:.74rem;}
    .flogo{font-family:'Playfair Display',serif;font-size:1.3rem;color:#fff;margin-bottom:.3rem;}
    .flogo span{color:var(--amb);}
    @media(max-width:900px){.hero{grid-template-columns:1fr;}.hero-vis{display:none;}.sbar{grid-template-columns:1fr 1fr;}.stats{grid-template-columns:1fr 1fr;}.how-grid{grid-template-columns:1fr;}}
    @media(max-width:580px){.sbar{grid-template-columns:1fr;}.sf{border-right:none;border-bottom:1px solid var(--br);}.brow{grid-template-columns:1fr;}.fg-2{grid-template-columns:1fr;}.gallery{grid-template-columns:repeat(2,1fr);}}
  `;

  // ── BOOKING BREAKDOWN ──
  const BookingBreakdown = ({ s }) => {
    if (nights < 1) return null;
    const base = s.price * nights;
    const ownerFee = Math.round(base * OWNER_FEE);
    const sitterFee = Math.round(base * SITTER_FEE);
    const youPay = base + ownerFee;
    const sitterGets = base - sitterFee;
    const platform = ownerFee + sitterFee;
    return (
      <div className="price-bd">
        <div className="pr hd"><span>Price Breakdown</span><span style={{fontWeight:400,color:"var(--mu)"}}>{nights} night{nights>1?"s":""}</span></div>
        <div className="pr"><span>Sitter rate × {nights}</span><span>{fmtP(base,currency)}</span></div>
        <div className="pr" style={{color:"var(--amb)"}}><span>Service fee (8%) <span style={{background:"#FDF0E0",borderRadius:100,padding:"1px 7px",fontSize:".62rem",fontWeight:700,marginLeft:4}}>charged to you</span></span><span>+{fmtP(ownerFee,currency)}</span></div>
        <div className="pr tot"><span>You pay total</span><span>{fmtP(youPay,currency)}</span></div>
        <div className="pr" style={{color:"var(--sage)"}}><span>Sitter receives</span><span>{fmtP(sitterGets,currency)}</span></div>
        <div className="pr" style={{color:"var(--amb)",fontWeight:600}}><span>PawStay earns (15% total)</span><span>{fmtP(platform,currency)}</span></div>
        <div className="paypal-bar"><span style={{fontSize:"1.1rem"}}>🅿</span><span>Secure payment via <strong>PayPal</strong></span></div>
      </div>
    );
  };

  // ── SITTER MODAL ──
  const SitterDetailModal = () => {
    const s = selected;
    if (!s) return null;
    const icons = {"Overnight stay":"🏠","Home visits":"🚪","Daily walks":"🦮","Grooming":"✂️"};
    return (
      <div className="overlay" onClick={e=>e.target===e.currentTarget&&setModal(null)}>
        <div className="modal">
          <div className="mhd">
            <span className="mtitle">Sitter Profile</span>
            <button className="xbtn" onClick={()=>setModal(null)}>✕</button>
          </div>
          <div className="mbody">
            {/* SITTER HERO */}
            <div className="shero">
              <div className="sav" style={{background:s.bg}}>{s.avatar}</div>
              <div className="smeta">
                <h2>{s.name}</h2>
                <div className="sloc">📍 {s.zone}, {s.city} · {s.experience} yrs experience</div>
                <div className="sbadges">
                  {s.verified && <span className="sb sb-s">✓ Verified</span>}
                  {s.reviewCount>0 && <span className="sb sb-a">⭐ {s.rating} ({s.reviewCount} reviews)</span>}
                  <span className={"sb "+(s.available?"sb-s":"sb-r")}>{s.available?"● Available":"● Unavailable"}</span>
                  {s.hasYard && <span className="sb sb-s">🌿 Has yard</span>}
                  {s.medicationOk && <span className="sb sb-a">💊 Meds OK</span>}
                </div>
              </div>
            </div>

            <div className="dlbl">About</div>
            <p className="abtxt" style={{marginBottom:"1.4rem"}}>{s.bio}</p>

            <div className="dlbl">Services</div>
            <div className="srv-grid">
              {["Overnight stay","Home visits","Daily walks","Grooming"].map(sv=>(
                <div key={sv} className={"srv-item"+(s.services.includes(sv)?" on":"")} style={{color:s.services.includes(sv)?"var(--brown)":"var(--mu)"}}>
                  <span>{icons[sv]}</span>{sv}
                  {s.services.includes(sv) && <span style={{marginLeft:"auto",fontWeight:700,color:"var(--amb)",fontSize:".78rem"}}>{fmtP(s.price,currency)}/night</span>}
                </div>
              ))}
            </div>

            <div className="dlbl">Conditions</div>
            <div className="conds">
              {[
                {ok:true, text:`Accepts: ${s.accepts.join(", ")}`},
                {ok:true, text:`Max ${s.maxPets} pet${s.maxPets>1?"s":""} at once`},
                {ok:s.hasYard, text:s.hasYard?"Fenced yard available":"No yard"},
                {ok:s.medicationOk, text:s.medicationOk?"Medication administration OK":"Cannot administer medication"},
              ].map((c,i)=>(
                <div key={i} className="cond">
                  <div className={"cdot "+(c.ok?"cy":"cn")}/>
                  <span style={{color:c.ok?"var(--brown)":"var(--rose)"}}>{c.text}</span>
                </div>
              ))}
            </div>

            <div className="dlbl">Availability — April 2026</div>
            <div className="cal-wrap">
              <div className="cal-days" style={{marginBottom:3}}>
                {["M","T","W","T","F","S","S"].map((d,i)=><div key={i} className="cal-hdr">{d}</div>)}
              </div>
              <div className="cal-days">
                {[...Array(2)].map((_,i)=><div key={"e"+i} style={{aspectRatio:"1"}}/>)}
                {[...Array(30)].map((_,i)=>{
                  const d=i+1, busy=s.busyDays.includes(d);
                  return <div key={d} className={"cal-day "+(busy?"cal-b":"cal-a")} title={busy?"Busy":"Available"}>{d}</div>;
                })}
              </div>
              <div style={{display:"flex",gap:"1rem",marginTop:".5rem",fontSize:".7rem",color:"var(--mu)"}}>
                <span><span style={{display:"inline-block",width:8,height:8,borderRadius:2,background:"#E8F0E4",marginRight:4}}/>Available</span>
                <span><span style={{display:"inline-block",width:8,height:8,borderRadius:2,background:"#FAE8E4",marginRight:4}}/>Busy</span>
              </div>
            </div>

            {/* PHOTO GALLERY + REVIEWS */}
            {s.photos.length > 0 && <>
              <div className="dlbl">Photos & Reviews ({s.reviewCount})</div>
              <div className="gallery">
                {s.photos.map((p,i)=>(
                  <div key={i} className="gallery-item" onClick={()=>setPhotoModal(p)}>
                    <img src={p.url} alt={p.caption} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                    <div className="gallery-overlay">
                      <div className="gallery-caption">{p.caption}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="reviews-list">
                {s.photos.map((p,i)=>(
                  <div key={i} className="rv">
                    <div className="rv-photo">
                      <img src={p.url} alt={p.pet} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                    </div>
                    <div className="rv-right">
                      <div className="rv-top">
                        <span className="rv-author">{p.reviewer}</span>
                        <span className="rv-date">{p.date}</span>
                      </div>
                      <div className="rv-pet">🐾 {p.pet}</div>
                      <Stars n={p.stars}/>
                      <div className="rv-txt" style={{marginTop:".3rem"}}>{p.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>}

            {loggedIn && !isSitter && (
              <button className="btn btn-sage btn-full" style={{marginBottom:"1rem"}}
                onClick={()=>{setReviewForm({sitterId:s.id,stars:5,text:"",pet:"",photo:null});setModal("review");}}>
                ✍️ Leave a review & photo
              </button>
            )}

            {/* BOOKING */}
            <div className="dlbl">Book a Stay</div>
            <div className="book-box">
              <div className="brow">
                <div className="ff"><label>Check-in</label>
                  <input type="date" value={search.from} onChange={e=>setSearch({...search,from:e.target.value})}/>
                </div>
                <div className="ff"><label>Check-out</label>
                  <input type="date" value={search.to} onChange={e=>setSearch({...search,to:e.target.value})}/>
                </div>
              </div>
              <div className="brow">
                <div className="ff"><label>Pet type</label>
                  <select value={search.pet} onChange={e=>setSearch({...search,pet:e.target.value})}>
                    {s.accepts.map(a=><option key={a}>{a}</option>)}
                  </select>
                </div>
                <div className="ff"><label>Service</label>
                  <select>
                    {s.services.map(sv=><option key={sv}>{sv}</option>)}
                  </select>
                </div>
              </div>
              <div className="ff">
                <label>Message to sitter</label>
                <textarea placeholder="Tell them about your pet — breed, age, habits, special needs..."/>
              </div>
              <BookingBreakdown s={s}/>
              <button className="btn btn-a btn-full" style={{marginTop:".85rem"}} onClick={handleBook}>
                {nights > 0 ? `Book Now — ${fmtP(s.price*nights*(1+OWNER_FEE), currency)} via PayPal 🐾` : "Select dates to book"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── AUTH MODAL ──
  const AuthModal = () => {
    const [tab, setTab] = useState("owner");
    const [pets, setPets] = useState([]);
    const toggle = p => setPets(prev=>prev.includes(p)?prev.filter(x=>x!==p):[...prev,p]);
    return (
      <div className="overlay" onClick={e=>e.target===e.currentTarget&&setModal(null)}>
        <div className="modal" style={{maxWidth:460}}>
          <div className="mhd"><span className="mtitle">Welcome to PawStay</span><button className="xbtn" onClick={()=>setModal(null)}>✕</button></div>
          <div className="mbody">
            <div className="tabs">
              <button className={"tab"+(tab==="owner"?" on":"")} onClick={()=>setTab("owner")}>🐾 I have a pet</button>
              <button className={"tab"+(tab==="sitter"?" on":"")} onClick={()=>setTab("sitter")}>🏠 I'm a sitter</button>
              <button className={"tab"+(tab==="login"?" on":"")} onClick={()=>setTab("login")}>Sign in</button>
            </div>
            {tab==="login" ? (
              <form onSubmit={e=>{e.preventDefault();handleLogin(e.target[0].value||"User",false);}}>
                <div className="fg"><label>Email</label><input type="email" placeholder="you@example.com" required/></div>
                <div className="fg"><label>Password</label><input type="password" placeholder="••••••••" required/></div>
                <button className="btn btn-a btn-full" type="submit">Sign in</button>
              </form>
            ) : (
              <form onSubmit={e=>{e.preventDefault();handleLogin(e.target[0].value||"User",tab==="sitter");}}>
                <div className="fg-2" style={{marginBottom:".85rem"}}>
                  <div className="fg" style={{marginBottom:0}}><label>First name</label><input placeholder="Jane" required/></div>
                  <div className="fg" style={{marginBottom:0}}><label>Last name</label><input placeholder="Smith"/></div>
                </div>
                <div className="fg"><label>Email</label><input type="email" placeholder="you@example.com" required/></div>
                <div className="fg"><label>Phone</label><input type="tel" placeholder="+1 (000) 000-0000"/></div>
                <div className="fg"><label>Password</label><input type="password" placeholder="Min. 8 characters" required/></div>
                {tab==="owner" && <div className="fg"><label>Your pets</label>
                  <div className="cbg">{PET_TYPES.map(p=><span key={p} className={"cbi"+(pets.includes(p)?" on":"")} onClick={()=>toggle(p)}>{"🐕🐈🐦🐇🐹".split("")[PET_TYPES.indexOf(p)]} {p}</span>)}</div>
                </div>}
                <button className="btn btn-a btn-full" type="submit">
                  {tab==="sitter"?"Continue to sitter setup →":"Create free account"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ── SITTER REGISTRATION ──
  const SitterRegModal = () => {
    const [accepts, setAccepts] = useState([]);
    const [services, setServices] = useState([]);
    const tog = (arr, setArr, v) => setArr(prev=>prev.includes(v)?prev.filter(x=>x!==v):[...prev,v]);
    return (
      <div className="overlay" onClick={e=>e.target===e.currentTarget&&setModal(null)}>
        <div className="modal" style={{maxWidth:540}}>
          <div className="mhd"><span className="mtitle">Create Sitter Profile 🐾</span><button className="xbtn" onClick={()=>setModal(null)}>✕</button></div>
          <div className="mbody">
            <form onSubmit={submitSitterProfile}>
              <div className="fg-2">
                <div className="fg"><label>First name</label><input name="name" placeholder="Jane" required/></div>
                <div className="fg"><label>City</label>
                  <select name="city" required>
                    <option value="">Select...</option>
                    {CITIES.filter(c=>c!=={T.city_all}).map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="fg-2">
                <div className="fg"><label>Neighborhood</label><input name="zone" placeholder="e.g. The Annex" required/></div>
                <div className="fg"><label>Your rate (CA$/night)</label><input name="price" type="number" placeholder="e.g. 45" min="10" required/></div>
              </div>
              <div className="fg-2">
                <div className="fg"><label>Years of experience</label><input name="exp" type="number" placeholder="e.g. 3" min="0" required/></div>
                <div className="fg"><label>Max pets at once</label><input name="maxpets" type="number" placeholder="e.g. 2" min="1" max="5" required/></div>
              </div>
              <div className="fg"><label>About you & your space</label>
                <textarea name="bio" placeholder="Describe your experience, your home, garden, own pets, house rules..." required/>
              </div>
              <div className="fg"><label>Accepted pets</label>
                <div className="cbg">{PET_TYPES.map(p=>{
                  const on=accepts.includes(p);
                  return <span key={p} className={"cbi"+(on?" on":"")} onClick={()=>tog(accepts,setAccepts,p)}>{p}</span>;
                })}</div>
              </div>
              <div className="fg"><label>Services offered</label>
                <div className="cbg">{SERVICES_LIST.map(sv=>{
                  const on=services.includes(sv);
                  return <span key={sv} className={"cbi"+(on?" on":"")} onClick={()=>tog(services,setServices,sv)}>{sv}</span>;
                })}</div>
              </div>
              <div className="toggle-row"><span>🌿 Fenced yard available</span><input name="yard" type="checkbox"/></div>
              <div className="toggle-row"><span>💊 Can administer medication</span><input name="med" type="checkbox"/></div>
              <div style={{background:"#EEF4FF",border:"1px solid #C0D0F0",borderRadius:12,padding:".8rem 1rem",marginBottom:"1rem",fontSize:".78rem",color:"#2040A0"}}>
                🅿 <strong>You keep 93%</strong> of every booking. PawStay retains a 7% platform fee. Payments via PayPal.
              </div>
              <button className="btn btn-a btn-full" type="submit">Publish my profile 🐾</button>
              <p style={{fontSize:".72rem",color:"var(--mu)",textAlign:"center",marginTop:".6rem"}}>Your profile goes live immediately. Verification badge added after review.</p>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // ── REVIEW MODAL ──
  const ReviewModal = () => {
    const [stars, setStars] = useState(5);
    const [text, setText] = useState("");
    const [pet, setPet] = useState("");
    const [previewUrl, setPreviewUrl] = useState(null);
    const handleFile = e => {
      const file = e.target.files[0];
      if (file) { const url = URL.createObjectURL(file); setPreviewUrl(url); setReviewForm(r=>({...r,photo:url})); }
    };
    return (
      <div className="overlay" onClick={e=>e.target===e.currentTarget&&setModal("sitter")}>
        <div className="modal" style={{maxWidth:480}}>
          <div className="mhd"><span className="mtitle">Leave a Review ✍️</span><button className="xbtn" onClick={()=>setModal("sitter")}>✕</button></div>
          <div className="mbody">
            <div className="fg"><label>Your rating</label>
              <div className="star-pick">
                {[1,2,3,4,5].map(n=>(
                  <span key={n} style={{color:n<=stars?"#E09010":"#ccc"}} onClick={()=>setStars(n)}>★</span>
                ))}
              </div>
            </div>
            <div className="fg"><label>Pet name & breed</label>
              <input placeholder="e.g. Max — Golden Retriever" value={pet} onChange={e=>setPet(e.target.value)} required/>
            </div>
            <div className="fg"><label>Your review</label>
              <textarea placeholder="Tell others about your experience — how was your pet cared for?" value={text} onChange={e=>setText(e.target.value)} style={{minHeight:100}} required/>
            </div>
            <div className="fg"><label>Upload a photo of your pet 📸</label>
              <input type="file" accept="image/*" ref={fileRef} style={{display:"none"}} onChange={handleFile}/>
              {previewUrl ? (
                <div style={{borderRadius:12,overflow:"hidden",height:160,marginBottom:".5rem",cursor:"pointer"}} onClick={()=>fileRef.current.click()}>
                  <img src={previewUrl} alt="preview" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                </div>
              ) : (
                <div onClick={()=>fileRef.current.click()} style={{border:"2px dashed var(--br)",borderRadius:12,padding:"2rem",textAlign:"center",cursor:"pointer",color:"var(--mu)",fontSize:".84rem",transition:"border-color .2s"}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor="var(--amb)"} onMouseLeave={e=>e.currentTarget.style.borderColor="var(--br)"}>
                  📸 Click to upload a photo<br/><span style={{fontSize:".72rem"}}>JPG, PNG — max 10MB</span>
                </div>
              )}
            </div>
            <button className="btn btn-a btn-full" onClick={()=>{
              setReviewForm({...reviewForm,stars,text,pet,photo:previewUrl});
              submitReview();
            }}>Publish review 🐾</button>
          </div>
        </div>
      </div>
    );
  };

  // ── MAIN RENDER ──
  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav>
        <div className="logo">Paw<span>Stay</span> 🐾</div>
        <div className="nav-r">
          <div className="cur-tog" style={{marginRight:".3rem"}}>
            {["EN","FR"].map(l=><button key={l} className={"cur-btn"+(lang===l?" on":"")} onClick={()=>setLang(l)}>{l==="EN"?"🇬🇧":"🇫🇷"} {l}</button>)}
          </div>
          <div className="cur-tog">
            {["CAD","USD"].map(c=><button key={c} className={"cur-btn"+(currency===c?" on":"")} onClick={()=>setCurrency(c)}>{c}</button>)}
          </div>
          {loggedIn
            ? <span style={{fontSize:".82rem",color:"var(--mu)"}}>👋 {userName}{isSitter?" (Sitter)":""}</span>
            : <button className="btn btn-gh" onClick={()=>setModal("auth")}>Sign in</button>}
          <button className="btn btn-a" onClick={()=>setModal(isSitter?"sitter-reg":"auth")}>
            {isSitter ? "My Profile" : "List your home"}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div>
          <div className="hero-tag">🐾 #1 Pet Sitting Platform in Canada</div>
          <h1>{T.hero_h1a}<br/>{T.hero_h1b} <i>loving hands</i></h1>
          <p>Connect with trusted, verified pet sitters across Canada. Sitters set their own prices, availability and conditions. You choose by rating, price and reviews.</p>
          <div className="hero-btns">
            <button className="btn btn-a btn-lg" onClick={()=>document.getElementById("sitters").scrollIntoView({behavior:"smooth"})}>Find a sitter 🔍</button>
            <button className="btn btn-gh btn-lg" onClick={()=>setModal("sitter-reg")}>{T.nav_become}</button>
          </div>
          <div className="trust">
            <div className="tavs">{["🐕","🐈","🐾","👩","🧑"].map((e,i)=><div key={i} className="tav">{e}</div>)}</div>
            <div className="trust-txt"><strong>+1,200 verified sitters</strong>across Canada · Avg. rating 4.9★ · Payments via PayPal</div>
          </div>
        </div>
        <div className="hero-vis">
          <div className="hcard">
            <div className="hcard-img">
              <img src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&q=80" alt="happy dog" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            </div>
            <div className="hcard-body">
              <div className="hcard-name">Sarah Mitchell</div>
              <div className="hcard-loc">📍 The Annex, Toronto</div>
              <div className="hcard-ft">
                <span><Stars n={4.9}/> <span style={{fontSize:".75rem",fontWeight:700}}>4.9</span></span>
                <span className="hcard-price">{fmtP(45,currency)}/night</span>
              </div>
            </div>
          </div>
          <div className="fl1">✓ Verified · Fenced yard 🌿</div>
          <div className="fl2">📸 Daily photo updates</div>
        </div>
      </div>

      {/* SEARCH */}
      <div className="search-wrap">
        <div className="sbar">
          <div className="sf"><label>City</label>
            <select value={filterCity} onChange={e=>setFilterCity(e.target.value)}>
              {CITIES.map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="sf"><label>Check-in</label>
            <input type="date" value={search.from} onChange={e=>setSearch({...search,from:e.target.value})}/>
          </div>
          <div className="sf"><label>Check-out</label>
            <input type="date" value={search.to} onChange={e=>setSearch({...search,to:e.target.value})}/>
          </div>
          <div className="sf"><label>Pet type</label>
            <select value={filterPet} onChange={e=>setFilterPet(e.target.value)}>
              <option>All</option>
              {PET_TYPES.map(p=><option key={p}>{p}</option>)}
            </select>
          </div>
          <button className="go-btn">🔍</button>
        </div>
      </div>

      {/* STATS */}
      <div className="stats">
        {[["1,200+","Verified sitters"],["15,000+","Happy pets"],["4.9 ★","Average rating"],["98%","Satisfied owners"]].map(([n,l])=>(
          <div className="stat" key={l}><div className="stat-n">{n}</div><div className="stat-l">{l}</div></div>
        ))}
      </div>

      {/* SITTER LIST */}
      <div className="sec" id="sitters">
        <div className="sec-hd">
          <div className="sec-title">{T.sec_title}</div>
          <span className="sec-meta">{filtered.length} sitter{filtered.length!==1?"s":""} found</span>
        </div>

        {/* FILTERS */}
        <div className="filters">
          <span className="flbl">Filter:</span>
          {PET_TYPES.map(p=><button key={p} className={"fc"+(filterPet===p?" on":"")} onClick={()=>setFilterPet(filterPet===p?"All":p)}>{"🐕🐈🐦🐇🐹".split("")[PET_TYPES.indexOf(p)]} {p}</button>)}
          <button className={"fc"+(filterAvail?" on":"")} onClick={()=>setFilterAvail(!filterAvail)}>✓ Available now</button>
          <button className={"fc"+(filterYard?" on":"")} onClick={()=>setFilterYard(!filterYard)}>🌿 Has yard</button>
          <button className={"fc"+(filterMed?" on":"")} onClick={()=>setFilterMed(!filterMed)}>💊 Meds OK</button>
          <span className="flbl" style={{marginLeft:".5rem"}}>Sort:</span>
          {[{T.sort1},{T.sort2},{T.sort3},{T.sort4}].map(s=><button key={s} className={"fc"+(sortBy===s?" on":"")} onClick={()=>setSortBy(s)}>{s}</button>)}
        </div>

        {/* CARDS */}
        <div className="grid">
          {filtered.length === 0 ? (
            <div style={{gridColumn:"1/-1",textAlign:"center",padding:"3rem",color:"var(--mu)"}}>
              <div style={{fontSize:"3rem",marginBottom:"1rem"}}>🔍</div>
              <div style={{fontSize:"1rem",fontWeight:600,marginBottom:".4rem"}}>No sitters found</div>
              <div style={{fontSize:".84rem"}}>Try adjusting your filters</div>
            </div>
          ) : filtered.map(s=>(
            <div className="scard" key={s.id} onClick={()=>openSitter(s)}>
              <div className="scard-img">
                {s.photos.length > 0
                  ? <img src={s.photos[0].url} alt={s.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                  : <div className="scard-img-bg" style={{background:s.bg}}>{s.avatar}</div>}
                <div className={"avl "+(s.available?"avl-y":"avl-n")}>{s.available?"✓ Available":"✗ Unavailable"}</div>
              </div>
              <div className="scard-body">
                <div className="scard-top">
                  <div className="scard-name">{s.name}</div>
                  <div className="scard-price">{fmtP(s.price,currency)}<small>/night</small></div>
                </div>
                <div className="scard-loc">📍 {s.zone}, {s.city} · {s.experience} yrs exp.</div>
                <div className="tags">
                  {s.accepts.map(a=><span key={a} className="tag t-s">{a}</span>)}
                  {s.hasYard && <span className="tag t-s">🌿 Yard</span>}
                  {s.medicationOk && <span className="tag t-a">💊 Meds</span>}
                  {s.verified && <span className="tag t-a">✓ Verified</span>}
                </div>
                <div className="scard-ft">
                  <span style={{display:"flex",alignItems:"center",gap:4}}>
                    {s.reviewCount > 0 ? <><Stars n={s.rating}/> <span style={{fontSize:".8rem",fontWeight:700,marginLeft:2}}>{s.rating}</span> <span style={{fontSize:".7rem",color:"var(--mu)"}}>({s.reviewCount})</span></> : <span style={{fontSize:".76rem",color:"var(--mu)"}}>No reviews yet</span>}
                  </span>
                  {s.verified && <span className="vbdg">🛡 Verified</span>}
                </div>
              </div>
              {/* PHOTO STRIP */}
              {s.photos.length > 1 && (
                <div className="photo-strip" onClick={e=>e.stopPropagation()}>
                  {s.photos.slice(0,4).map((p,i)=>(
                    <div key={i} className="photo-thumb" onClick={()=>{openSitter(s);setPhotoModal(p);}}>
                      <img src={p.url} alt={p.caption} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                    </div>
                  ))}
                  {s.photos.length > 4 && <div style={{width:52,height:52,borderRadius:8,background:"var(--li)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".75rem",fontWeight:700,color:"var(--amb)",flexShrink:0}}>+{s.photos.length-4}</div>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="how">
        <div className="how-in">
          <div className="how-title">{T.how_title}</div>
          <div className="how-sub">Simple, transparent, trusted</div>
          <div className="how-grid">
            {[
              {i:"🔍",t:{T.how1_t},p:"Browse sitters by city, pet type, price and rating. Sitters set their own rates and availability."},
              {i:"📅",t:{T.how2_t},p:"Choose your dates, send a request with a message. The sitter confirms within a few hours."},
              {i:"📸",t:{T.how3_t},p:"Your sitter sends photos and updates every day. After the stay, leave a review with a photo!"},
            ].map(({i,t,p})=>(
              <div className="how-step" key={t}>
                <div className="how-ico">{i}</div>
                <h3>{t}</h3><p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer>
        <div className="flogo">Paw<span>Stay</span> 🐾</div>
        <div>© 2026 PawStay · Verified platform · Secure PayPal payments · Canada</div>
        <div style={{marginTop:".3rem"}}>Platform fee: 8% charged to pet owners · 7% retained from sitters · 15% total</div>
      </footer>

      {/* MODALS */}
      {modal === "sitter" && selected && <SitterDetailModal/>}
      {modal === "auth" && <AuthModal/>}
      {modal === "sitter-reg" && <SitterRegModal/>}
      {modal === "review" && <ReviewModal/>}
      {modal === "payment" && paymentData && <PaymentModal booking={paymentData} onClose={()=>setModal("sitter")} onSuccess={handlePaymentSuccess}/>}

      {/* PHOTO LIGHTBOX */}
      {photoModal && (
        <div className="lightbox" onClick={()=>setPhotoModal(null)}>
          <div className="lb-inner" onClick={e=>e.stopPropagation()}>
            <div className="lb-img">
              <img src={photoModal.url} alt={photoModal.caption} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            </div>
            <div className="lb-info">
              <div className="lb-caption">{photoModal.caption}</div>
              <div className="lb-reviewer">🐾 {photoModal.pet} · Reviewed by {photoModal.reviewer} · {photoModal.date}</div>
              <Stars n={photoModal.stars}/>
              <div className="lb-text" style={{marginTop:".4rem"}}>{photoModal.text}</div>
            </div>
            <button className="xbtn" style={{position:"absolute",top:"1rem",right:"1rem"}} onClick={()=>setPhotoModal(null)}>✕</button>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && <div className={"toast "+(toast.ok?"tok":"terr")}>{toast.ok?"✓":"⚠"} {toast.msg}</div>}
    </>
  );
}
