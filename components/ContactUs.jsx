"use client";

import { useState, useEffect } from "react";

export default function ContactUs() {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("skincare");
  const [formData, setFormData] = useState({ name: "", phone: "", concern: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = () => {
    if (formData.name && formData.phone) setSubmitted(true);
  };

  const concerns = {
    skincare: ["Acne & Breakouts", "Pigmentation & Dark Spots", "Anti-Ageing", "Dry / Oily Skin", "Sensitive Skin", "Prescription Skincare"],
    haircare: ["Hair Fall & Thinning", "Dandruff & Scalp Issues", "Hair Texture", "Post-Treatment Care", "Prescription Haircare"],
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600&family=Lora:ital,wght@0,400;0,500;1,400;1,500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .cp {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: #f4f7f5;
          color: #0f1f1a;
          min-height: 100vh;
          --green: #1a6b4a;
          --green-light: #2a8a61;
          --green-pale: #e8f2ee;
          --cream: #faf9f7;
          --charcoal: #0f1f1a;
          --mid: #4a6159;
          --muted: #8fa89e;
          --border: #dce8e3;
        }

        /* HERO */
        .cp-hero {
          background: var(--charcoal);
          position: relative;
          overflow: hidden;
        }
        .cp-hero-bg {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(42,138,97,0.1) 1px, transparent 1px);
          background-size: 30px 30px;
          pointer-events: none;
        }
        .cp-hero-glow {
          position: absolute;
          width: 600px; height: 400px;
          background: radial-gradient(ellipse, rgba(42,138,97,0.15) 0%, transparent 65%);
          top: -80px; left: -100px;
          pointer-events: none;
        }
        .cp-hero-grid {
          display: grid;
          grid-template-columns: 1fr 400px;
          max-width: 1200px;
          margin: 0 auto;
          min-height: 520px;
        }
        .cp-hero-left {
          padding: 80px 60px 80px 48px;
          display: flex; flex-direction: column; justify-content: center;
          position: relative; z-index: 2;
        }
        .cp-pill {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(42,138,97,0.15);
          border: 1px solid rgba(42,138,97,0.3);
          border-radius: 100px; padding: 6px 14px;
          font-size: 11px; font-weight: 500; letter-spacing: 0.14em;
          text-transform: uppercase; color: #6fcfa4;
          margin-bottom: 28px; width: fit-content;
          opacity: 0; transform: translateY(10px);
          transition: all 0.6s ease;
        }
        .cp-pill.v { opacity: 1; transform: translateY(0); }
        .cp-pulse {
          width: 6px; height: 6px; background: #6fcfa4; border-radius: 50%;
          animation: cp-pulse 2s infinite;
        }
        @keyframes cp-pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.4; transform:scale(0.65); }
        }
        .cp-hero-h1 {
          font-family: 'Lora', serif; font-weight: 400;
          font-size: clamp(36px, 5vw, 58px);
          color: #f0f7f4; line-height: 1.1;
          margin-bottom: 20px;
          opacity: 0; transform: translateY(16px);
          transition: all 0.7s ease 0.1s;
        }
        .cp-hero-h1.v { opacity: 1; transform: translateY(0); }
        .cp-hero-h1 em { font-style: italic; color: #6fcfa4; }
        .cp-hero-sub {
          font-size: 14px; color: rgba(240,247,244,0.52);
          line-height: 1.8; max-width: 430px; font-weight: 300;
          opacity: 0; transform: translateY(12px);
          transition: all 0.7s ease 0.2s;
        }
        .cp-hero-sub.v { opacity: 1; transform: translateY(0); }
        .cp-hero-stats {
          display: flex; gap: 0; margin-top: 44px;
          opacity: 0; transform: translateY(10px);
          transition: all 0.7s ease 0.3s;
        }
        .cp-hero-stats.v { opacity: 1; transform: translateY(0); }
        .cp-stat { padding-right: 32px; }
        .cp-stat + .cp-stat { padding-left: 32px; border-left: 1px solid rgba(255,255,255,0.1); }
        .cp-stat-num {
          font-family: 'Lora', serif; font-size: 28px;
          color: #f0f7f4; line-height: 1;
        }
        .cp-stat-lbl {
          font-size: 11px; letter-spacing: 0.1em;
          text-transform: uppercase; color: rgba(240,247,244,0.38);
          margin-top: 4px;
        }
        .cp-hero-right {
          border-left: 1px solid rgba(255,255,255,0.07);
          padding: 48px 36px;
          display: flex; flex-direction: column; justify-content: center; gap: 12px;
          position: relative; z-index: 2;
          opacity: 0; transform: translateX(18px);
          transition: all 0.75s ease 0.35s;
        }
        .cp-hero-right.v { opacity: 1; transform: translateX(0); }
        .cp-qc-lbl {
          font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(240,247,244,0.3); margin-bottom: 4px;
        }
        .cp-qc-item {
          display: flex; align-items: center; gap: 14px;
          padding: 15px 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.2s;
          cursor: pointer;
        }
        .cp-qc-item:hover {
          background: rgba(42,138,97,0.14);
          border-color: rgba(42,138,97,0.3);
          transform: translateX(4px);
        }
        .cp-qc-ico {
          width: 38px; height: 38px;
          background: rgba(42,138,97,0.18);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; flex-shrink: 0;
        }
        .cp-qc-name { font-size: 13px; font-weight: 500; color: #f0f7f4; }
        .cp-qc-hint { font-size: 11px; color: rgba(240,247,244,0.38); margin-top: 2px; }
        .cp-qc-arr {
          margin-left: auto; color: rgba(240,247,244,0.2);
          font-size: 18px; transition: color 0.2s, transform 0.2s;
        }
        .cp-qc-item:hover .cp-qc-arr { color: #6fcfa4; transform: translateX(3px); }

        /* AVAIL STRIP */
        .cp-avail {
          background: var(--green);
          padding: 13px 48px;
          display: flex; align-items: center; justify-content: center;
          gap: 28px; flex-wrap: wrap;
        }
        .cp-av-item {
          display: flex; align-items: center; gap: 8px;
          font-size: 12px; color: rgba(255,255,255,0.88); letter-spacing: 0.03em;
        }
        .cp-av-dot {
          width: 7px; height: 7px; background: #a8edcc; border-radius: 50%;
        }

        /* BODY */
        .cp-body { max-width: 1200px; margin: 0 auto; padding: 72px 48px 80px; }

        .cp-sec-lbl {
          font-size: 10.5px; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--green); font-weight: 600; margin-bottom: 10px;
        }
        .cp-sec-title {
          font-family: 'Lora', serif; font-weight: 400;
          font-size: clamp(24px, 3vw, 34px);
          color: var(--charcoal); margin-bottom: 40px; line-height: 1.25;
        }
        .cp-sec-title em { font-style: italic; color: var(--green); }

        /* CHANNELS */
        .cp-channels { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; margin-bottom: 72px; }

        .cp-ch {
          background: white; border: 1px solid var(--border);
          border-radius: 14px; padding: 32px 28px;
          position: relative; overflow: hidden;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
        }
        .cp-ch:hover {
          border-color: var(--ch-accent);
          box-shadow: 0 10px 36px rgba(15,31,26,0.09);
          transform: translateY(-4px);
        }
        .cp-ch::after {
          content: ''; position: absolute;
          top: 0; left: 0; right: 0; height: 3px;
          background: var(--ch-accent);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.3s ease;
        }
        .cp-ch:hover::after { transform: scaleX(1); }

        .cp-ch-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: var(--ch-bg); color: var(--ch-accent);
          font-size: 10px; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; padding: 5px 12px;
          border-radius: 100px; margin-bottom: 18px;
        }
        .cp-ch-ico {
          width: 52px; height: 52px; background: var(--ch-bg);
          border-radius: 12px; display: flex; align-items: center;
          justify-content: center; font-size: 24px; margin-bottom: 16px;
        }
        .cp-ch-title {
          font-family: 'Lora', serif; font-size: 22px;
          font-weight: 400; color: var(--charcoal); margin-bottom: 10px;
        }
        .cp-ch-desc {
          font-size: 13px; color: var(--mid); line-height: 1.72;
          font-weight: 300; margin-bottom: 22px;
        }
        .cp-ch-list { list-style: none; margin-bottom: 26px; }
        .cp-ch-list li {
          font-size: 12.5px; color: var(--charcoal);
          padding: 7px 0; border-bottom: 1px solid var(--border);
          display: flex; align-items: flex-start; gap: 10px; line-height: 1.45;
        }
        .cp-ch-list li:last-child { border-bottom: none; }
        .cp-ch-chk {
          width: 16px; height: 16px; background: var(--ch-bg);
          border-radius: 50%; display: flex; align-items: center;
          justify-content: center; flex-shrink: 0; margin-top: 1px;
          font-size: 9px; color: var(--ch-accent);
        }
        .cp-ch-phones {
          background: #f5f7f6; border-radius: 8px; padding: 14px 16px; margin-bottom: 20px;
        }
        .cp-ch-phone-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 6px 0;
        }
        .cp-ch-phone-row + .cp-ch-phone-row { border-top: 1px solid var(--border); }
        .cp-ph-num {
          font-family: 'Lora', serif; font-size: 17px;
          color: var(--charcoal); text-decoration: none;
          transition: color 0.2s;
        }
        .cp-ph-num:hover { color: var(--green); }
        .cp-ph-tag { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
        .cp-ph-hours {
          font-size: 11.5px; color: var(--muted);
          margin-top: 10px; display: flex; align-items: center; gap: 6px;
        }
        .cp-ch-btn {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; padding: 13px 18px;
          background: var(--charcoal); color: white;
          border: none; border-radius: 8px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 12px; font-weight: 600; letter-spacing: 0.07em;
          text-transform: uppercase; cursor: pointer;
          text-decoration: none; transition: background 0.2s;
        }
        .cp-ch-btn:hover { background: var(--green); }

        /* FORM SECTION */
        .cp-form-sec {
          display: grid; grid-template-columns: 1fr 440px;
          gap: 52px; align-items: start; margin-bottom: 72px;
        }
        .cp-form-info h2 {
          font-family: 'Lora', serif; font-size: 30px; font-weight: 400;
          color: var(--charcoal); line-height: 1.25; margin-bottom: 12px;
        }
        .cp-form-info h2 em { font-style: italic; color: var(--green); }
        .cp-form-info > p {
          font-size: 13.5px; color: var(--mid); line-height: 1.75;
          font-weight: 300; margin-bottom: 32px;
        }
        .cp-tabs { display: flex; gap: 8px; margin-bottom: 18px; }
        .cp-tab {
          padding: 8px 20px; border-radius: 100px;
          font-size: 12.5px; font-weight: 500; cursor: pointer;
          border: 1.5px solid var(--border);
          background: white; color: var(--mid);
          font-family: 'Plus Jakarta Sans', sans-serif;
          transition: all 0.2s;
        }
        .cp-tab.active { background: var(--green); border-color: var(--green); color: white; }
        .cp-concern-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .cp-chip {
          padding: 9px 13px; border-radius: 8px; font-size: 12px;
          border: 1px solid var(--border); background: white; color: var(--mid);
          cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif;
          transition: all 0.18s; text-align: left;
          display: flex; align-items: center; gap: 8px;
        }
        .cp-chip:hover { border-color: var(--green); color: var(--green); }
        .cp-chip.sel { background: var(--green-pale); border-color: var(--green); color: var(--green); font-weight: 500; }

        .cp-form-card {
          background: white; border: 1px solid var(--border);
          border-radius: 16px; padding: 36px 32px;
          box-shadow: 0 4px 24px rgba(15,31,26,0.05);
        }
        .cp-form-card h3 {
          font-family: 'Lora', serif; font-size: 21px;
          font-weight: 400; color: var(--charcoal); margin-bottom: 6px;
        }
        .cp-form-card > p { font-size: 12.5px; color: var(--muted); margin-bottom: 24px; }
        .cp-field { margin-bottom: 16px; }
        .cp-field label {
          display: block; font-size: 11px; font-weight: 600;
          letter-spacing: 0.09em; text-transform: uppercase;
          color: var(--mid); margin-bottom: 7px;
        }
        .cp-field input, .cp-field select, .cp-field textarea {
          width: 100%; padding: 11px 14px;
          border: 1.5px solid var(--border); border-radius: 8px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13.5px; color: var(--charcoal);
          background: #fafcfb; outline: none; resize: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .cp-field input:focus, .cp-field select:focus, .cp-field textarea:focus {
          border-color: var(--green);
          box-shadow: 0 0 0 3px rgba(42,138,97,0.1);
          background: white;
        }
        .cp-field select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238fa89e' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 14px center; padding-right: 38px;
        }
        .cp-submit {
          width: 100%; padding: 14px;
          background: var(--green); color: white; border: none;
          border-radius: 8px; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px; font-weight: 600; letter-spacing: 0.06em;
          text-transform: uppercase; cursor: pointer; margin-top: 6px;
          transition: background 0.2s, transform 0.15s;
        }
        .cp-submit:hover { background: var(--charcoal); transform: translateY(-1px); }
        .cp-success { text-align: center; padding: 28px 0; }
        .cp-success-ico {
          width: 62px; height: 62px; background: var(--green-pale);
          border-radius: 50%; display: flex; align-items: center;
          justify-content: center; font-size: 26px; margin: 0 auto 16px;
        }
        .cp-success h4 {
          font-family: 'Lora', serif; font-size: 20px; color: var(--charcoal); margin-bottom: 8px;
        }
        .cp-success p { font-size: 13px; color: var(--muted); line-height: 1.65; }

        /* CLINIC + MAP */
        .cp-clinic-sec {
          display: grid; grid-template-columns: 340px 1fr;
          gap: 24px; margin-bottom: 72px; align-items: start;
        }
        .cp-clinic-card {
          background: var(--charcoal); border-radius: 16px;
          padding: 36px 28px; color: white;
        }
        .cp-clinic-card .cp-sec-lbl { color: #6fcfa4; }
        .cp-clinic-title {
          font-family: 'Lora', serif; font-size: 26px;
          font-weight: 400; color: white; margin-bottom: 24px; line-height: 1.2;
        }
        .cp-clinic-title em { font-style: italic; color: #6fcfa4; }
        .cp-addr-box {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px; padding: 18px 16px; margin-bottom: 20px;
        }
        .cp-addr-box p { font-size: 13px; color: rgba(255,255,255,0.72); line-height: 1.85; font-weight: 300; }
        .cp-addr-box strong { color: white; font-weight: 500; }
        .cp-timing {
          display: flex; justify-content: space-between; align-items: center;
          padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .cp-timing:last-of-type { border-bottom: none; }
        .cp-timing-day { font-size: 12px; color: rgba(255,255,255,0.5); }
        .cp-timing-time { font-size: 13px; color: white; }
        .cp-timing-closed { font-size: 13px; color: rgba(255,255,255,0.28); font-style: italic; }
        .cp-dir-btn {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; padding: 13px; background: var(--green);
          color: white; border-radius: 8px; text-decoration: none;
          font-size: 12.5px; font-weight: 600; letter-spacing: 0.07em;
          text-transform: uppercase; margin-top: 22px; transition: background 0.2s;
        }
        .cp-dir-btn:hover { background: var(--green-light); }
        .cp-map-wrap {
          border-radius: 16px; overflow: hidden;
          height: 100%; min-height: 430px;
          position: relative; border: 1px solid var(--border);
        }
        .cp-map-wrap iframe { width: 100%; height: 100%; border: none; display: block; }
        .cp-map-top {
          position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, var(--green) 0%, #6fcfa4 50%, #2d6fa3 100%);
        }

        /* TRUST */
        .cp-trust {
          background: white; border: 1px solid var(--border);
          border-radius: 16px; padding: 36px 40px;
          display: grid; grid-template-columns: repeat(4,1fr); gap: 0;
        }
        .cp-trust-item {
          display: flex; flex-direction: column; align-items: center;
          text-align: center; padding: 16px 20px; position: relative;
        }
        .cp-trust-item + .cp-trust-item::before {
          content: ''; position: absolute;
          left: 0; top: 50%; transform: translateY(-50%);
          height: 48px; width: 1px; background: var(--border);
        }
        .cp-trust-ico {
          width: 48px; height: 48px; background: var(--green-pale);
          border-radius: 12px; display: flex; align-items: center;
          justify-content: center; font-size: 22px; margin-bottom: 13px;
        }
        .cp-trust-lbl { font-size: 13px; font-weight: 600; color: var(--charcoal); margin-bottom: 5px; }
        .cp-trust-sub { font-size: 11.5px; color: var(--muted); line-height: 1.5; }

        /* RESPONSIVE */
        @media (max-width: 920px) {
          .cp-hero-grid { grid-template-columns: 1fr; min-height: auto; }
          .cp-hero-right {
            border-left: none; border-top: 1px solid rgba(255,255,255,0.07);
            flex-direction: row; flex-wrap: wrap; gap: 10px; padding: 24px 30px;
          }
          .cp-qc-lbl { display: none; }
          .cp-qc-item { flex: 1; min-width: 150px; }
          .cp-channels { grid-template-columns: 1fr; }
          .cp-form-sec { grid-template-columns: 1fr; }
          .cp-clinic-sec { grid-template-columns: 1fr; }
          .cp-trust { grid-template-columns: 1fr 1fr; }
          .cp-trust-item + .cp-trust-item::before { display: none; }
          .cp-body { padding: 48px 24px 60px; }
          .cp-avail { gap: 14px; padding: 12px 24px; }
        }
        @media (max-width: 580px) {
          .cp-hero-left { padding: 56px 24px; }
          .cp-hero-stats { gap: 0; }
          .cp-concern-grid { grid-template-columns: 1fr; }
          .cp-trust { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="cp">

        {/* HERO */}
        <section className="cp-hero">
          <div className="cp-hero-bg" />
          <div className="cp-hero-glow" />
          <div className="cp-hero-grid">
            <div className="cp-hero-left">
              <div className={`cp-pill ${visible ? "v" : ""}`}>
                <span className="cp-pulse" />
                Dermatologist-Backed Skincare
              </div>
              <h1 className={`cp-hero-h1 ${visible ? "v" : ""}`}>
                We're Here<br />to Help Your<br />Skin <em>Thrive</em>
              </h1>
              <p className={`cp-hero-sub ${visible ? "v" : ""}`}>
                From prescription skincare to personalised haircare routines —
                our experts are available online, on call, and at our Mumbai
                clinic. Reach us the way you prefer.
              </p>
              <div className={`cp-hero-stats ${visible ? "v" : ""}`}>
                {[["10k+", "Patients Served"], ["200+", "Curated Products"], ["12 yr", "Clinical Experience"]].map(([n, l]) => (
                  <div className="cp-stat" key={l}>
                    <div className="cp-stat-num">{n}</div>
                    <div className="cp-stat-lbl">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`cp-hero-right ${visible ? "v" : ""}`}>
              <p className="cp-qc-lbl">Quick Connect</p>
              {[
                { icon: "🛒", name: "Shop Online", hint: "Browse 200+ products", href: "/products" },
                { icon: "💬", name: "WhatsApp", hint: "+91 97699 33396", href: "https://wa.me/919769933396" },
                { icon: "📞", name: "Call Us", hint: "Mon–Fri 10am–8pm", href: "tel:+919769933396" },
                { icon: "🏬", name: "Visit Clinic", hint: "Santacruz West, Mumbai", href: "#clinic" },
              ].map((item) => (
                <a key={item.name} href={item.href} className="cp-qc-item" target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                  <div className="cp-qc-ico">{item.icon}</div>
                  <div>
                    <div className="cp-qc-name">{item.name}</div>
                    <div className="cp-qc-hint">{item.hint}</div>
                  </div>
                  <span className="cp-qc-arr">›</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* AVAILABILITY STRIP */}
        <div className="cp-avail">
          {[
            "Online Orders — 24 / 7",
            "WhatsApp Support — Mon–Sat",
            "Clinic Open — Mon–Sat",
            "Pan-India Delivery Available",
          ].map((txt) => (
            <span key={txt} className="cp-av-item">
              <span className="cp-av-dot" />{txt}
            </span>
          ))}
        </div>

        <div className="cp-body">

          {/* CONTACT CHANNELS */}
          <p className="cp-sec-lbl">Contact Channels</p>
          <h2 className="cp-sec-title">Choose How You'd Like to <em>Connect</em></h2>

          <div className="cp-channels">
            {/* Online */}
            <div className="cp-ch" style={{ "--ch-accent": "#1a6b4a", "--ch-bg": "#e8f2ee" }}>
              <div className="cp-ch-ico">🛍️</div>
              <div className="cp-ch-badge"><span style={{ width:6,height:6,borderRadius:"50%",background:"currentColor",display:"inline-block" }} />Shop Online</div>
              <h3 className="cp-ch-title">Order from Home</h3>
              <p className="cp-ch-desc">Browse our complete range of dermatologist-curated skincare and haircare products. Secure checkout, fast pan-India delivery.</p>
              <ul className="cp-ch-list">
                {["Easy Online Ordering", "Secure Payment Gateway", "Fast Pan-India Delivery", "Genuine Pharma-Grade Products"].map(f => (
                  <li key={f}><span className="cp-ch-chk">✓</span>{f}</li>
                ))}
              </ul>
              <a href="/products" className="cp-ch-btn">Explore Products <span>→</span></a>
            </div>

            {/* Call / WhatsApp */}
            <div className="cp-ch" style={{ "--ch-accent": "#25a244", "--ch-bg": "#e7f5ea" }}>
              <div className="cp-ch-ico">💬</div>
              <div className="cp-ch-badge"><span style={{ width:6,height:6,borderRadius:"50%",background:"currentColor",display:"inline-block" }} />Call / WhatsApp</div>
              <h3 className="cp-ch-title">Talk to an Expert</h3>
              <p className="cp-ch-desc">Speak with our skincare specialists before ordering. Get guided to the right product for your concern and skin type.</p>
              <div className="cp-ch-phones">
                <div className="cp-ch-phone-row">
                  <a href="tel:+919769933396" className="cp-ph-num">+91 97699 33396</a>
                  <span className="cp-ph-tag">Primary</span>
                </div>
                <div className="cp-ch-phone-row">
                  <a href="tel:+919769911196" className="cp-ph-num">+91 97699 11196</a>
                  <span className="cp-ph-tag">Alternate</span>
                </div>
                <p className="cp-ph-hours"><span>🕐</span> Mon–Fri 10am–8pm · Sat 10am–2pm</p>
              </div>
              <ul className="cp-ch-list">
                {["Product Recommendations", "Prescription Inquiries", "Skin & Hair Concern Guidance"].map(f => (
                  <li key={f}><span className="cp-ch-chk">✓</span>{f}</li>
                ))}
              </ul>
              <a href="https://wa.me/919769933396" target="_blank" rel="noopener noreferrer" className="cp-ch-btn">WhatsApp Us Now <span>→</span></a>
            </div>

            {/* Clinic */}
            <div className="cp-ch" style={{ "--ch-accent": "#2d6fa3", "--ch-bg": "#e6f0f8" }}>
              <div className="cp-ch-ico">🏥</div>
              <div className="cp-ch-badge"><span style={{ width:6,height:6,borderRadius:"50%",background:"currentColor",display:"inline-block" }} />In-Clinic Visit</div>
              <h3 className="cp-ch-title">Visit Our Clinic</h3>
              <p className="cp-ch-desc">Experience hands-on consultation and shop directly at Juvenis Clinic, Santacruz West. Walk-ins welcome.</p>
              <ul className="cp-ch-list">
                {["Personalised Skin Analysis", "Prescription-Based Guidance", "In-Person Product Selection", "Walk-in Welcome · No Appointment"].map(f => (
                  <li key={f}><span className="cp-ch-chk">✓</span>{f}</li>
                ))}
              </ul>
              <a href="https://www.google.com/maps/search/Juvenis+Clinic+86+SV+Road+Santacruz+West+Mumbai" target="_blank" rel="noopener noreferrer" className="cp-ch-btn">Get Directions <span>→</span></a>
            </div>
          </div>

          {/* CONCERN FORM */}
          <div className="cp-form-sec">
            <div className="cp-form-info">
              <p className="cp-sec-lbl">Personalised Advice</p>
              <h2>Not Sure Which<br /><em>Product is Right</em><br />For You?</h2>
              <p>Share your concern and one of our dermatology-trained advisors will recommend the best-suited products from our range. No guesswork — just clinical guidance.</p>

              <div className="cp-tabs">
                <button className={`cp-tab ${activeTab === "skincare" ? "active" : ""}`} onClick={() => setActiveTab("skincare")}>🌿 Skincare</button>
                <button className={`cp-tab ${activeTab === "haircare" ? "active" : ""}`} onClick={() => setActiveTab("haircare")}>💆 Haircare</button>
              </div>
              <div className="cp-concern-grid">
                {concerns[activeTab].map(c => (
                  <button key={c} className={`cp-chip ${formData.concern === c ? "sel" : ""}`} onClick={() => setFormData(p => ({ ...p, concern: c }))}>
                    <span style={{ fontSize: 13 }}>{formData.concern === c ? "✓" : "○"}</span>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="cp-form-card">
              {submitted ? (
                <div className="cp-success">
                  <div className="cp-success-ico">✓</div>
                  <h4>We've Got Your Query!</h4>
                  <p>Our skincare expert will reach out within 24 hours with a personalised product recommendation tailored to your concern.</p>
                </div>
              ) : (
                <>
                  <h3>Request a Recommendation</h3>
                  <p>We'll reach out within 24 hours</p>
                  <div className="cp-field">
                    <label>Full Name</label>
                    <input type="text" placeholder="e.g. Priya Sharma" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} />
                  </div>
                  <div className="cp-field">
                    <label>Phone / WhatsApp</label>
                    <input type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} />
                  </div>
                  <div className="cp-field">
                    <label>Primary Concern</label>
                    <select value={formData.concern} onChange={e => setFormData(p => ({ ...p, concern: e.target.value }))}>
                      <option value="">Select your concern</option>
                      <optgroup label="Skincare">{concerns.skincare.map(c => <option key={c} value={c}>{c}</option>)}</optgroup>
                      <optgroup label="Haircare">{concerns.haircare.map(c => <option key={c} value={c}>{c}</option>)}</optgroup>
                    </select>
                  </div>
                  <div className="cp-field">
                    <label>Additional Notes <span style={{ color: "var(--muted)", fontSize: 10 }}>(Optional)</span></label>
                    <textarea rows={3} placeholder="Any products you've tried, allergies, or details that may help…" value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} />
                  </div>
                  <button className="cp-submit" onClick={handleSubmit}>Send My Concern →</button>
                </>
              )}
            </div>
          </div>

          {/* CLINIC + MAP */}
          <div id="clinic" className="cp-clinic-sec">
            <div className="cp-clinic-card">
              <p className="cp-sec-lbl">Our Clinic</p>
              <h3 className="cp-clinic-title">Juvenis <em>Clinic</em></h3>
              <div className="cp-addr-box">
                <p><strong>4 Adarsh, Ground Floor</strong><br />Behind Archies Gallery<br />86, S.V. Road, Santacruz West<br />Mumbai — 400 054</p>
              </div>
              {[
                { day: "Monday – Friday", time: "10:00 am – 8:00 pm" },
                { day: "Saturday", time: "10:00 am – 2:00 pm" },
                { day: "Sunday", time: "Closed" },
              ].map(t => (
                <div className="cp-timing" key={t.day}>
                  <span className="cp-timing-day">{t.day}</span>
                  {t.time === "Closed"
                    ? <span className="cp-timing-closed">Closed</span>
                    : <span className="cp-timing-time">{t.time}</span>
                  }
                </div>
              ))}
              <a href="https://www.google.com/maps/search/Juvenis+Clinic+86+SV+Road+Santacruz+West+Mumbai" target="_blank" rel="noopener noreferrer" className="cp-dir-btn">
                📍 Open in Google Maps
              </a>
            </div>

            <div className="cp-map-wrap">
              <div className="cp-map-top" />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.1234!2d72.8285!3d19.0760!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9b888ae67b7%3A0x60f1e4c4e5d0bab0!2s86%2C%20Swami%20Vivekanand%20Rd%2C%20Santacruz%20West%2C%20Mumbai%2C%20Maharashtra%20400054!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Juvenis Clinic Location"
              />
            </div>
          </div>

          {/* TRUST */}
          <div className="cp-trust">
            {[
              { ico: "🔬", lbl: "Dermatologist Approved", sub: "All products clinically reviewed" },
              { ico: "💊", lbl: "Genuine Products Only", sub: "100% authentic, no counterfeits" },
              { ico: "🚚", lbl: "Fast Delivery", sub: "Pan-India shipping available" },
              { ico: "🤝", lbl: "Expert Guidance", sub: "Personalised to your skin type" },
            ].map(t => (
              <div className="cp-trust-item" key={t.lbl}>
                <div className="cp-trust-ico">{t.ico}</div>
                <div className="cp-trust-lbl">{t.lbl}</div>
                <div className="cp-trust-sub">{t.sub}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
