import React, { useMemo, useState, useEffect } from 'react';
import {
  ArrowLeft, ArrowUpLeft, Crosshair, Download, Target, MessageCircle,
  ShoppingBag, Copy, Check, Smartphone, ChevronDown, Zap, ShieldCheck,
  Gamepad2, Menu, X, ExternalLink, Sparkles, SlidersHorizontal, RotateCcw
} from 'lucide-react';
import { sections, devices, starterSensitivity } from './data.js';

const downloadUrl = 'https://www.mediafire.com/file/oysse988prq88oa/FREE+FIRE+HYPERS+V8A.apk/file';
const hudCode = '#FFHUDT6O3jrFZIvVPo7eM';
const tiktokUrl = 'https://www.tiktok.com/@black_a249';
const discordUrl = 'https://discord.gg/MVJz4VVUH';

function Icon({ name, size = 22 }) {
  const props = { size, strokeWidth: 1.8 };
  const map = { crosshair: <Crosshair {...props}/>, download: <Download {...props}/>, target: <Target {...props}/>, message: <MessageCircle {...props}/>, shopping: <ShoppingBag {...props}/> };
  return map[name] || <Zap {...props}/>;
}

function App() {
  const [page, setPage] = useState('home');
  const [history, setHistory] = useState(['home']);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [device, setDevice] = useState('Samsung Galaxy S23 Ultra');
  const [deviceQuery, setDeviceQuery] = useState('');
  const [style, setStyle] = useState('balanced');
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setSplash(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredDevices = useMemo(() => {
    const q = deviceQuery.trim().toLowerCase();
    return q ? devices.filter(d => d.toLowerCase().includes(q)).slice(0, 7) : [];
  }, [deviceQuery]);

  function navigate(next) {
    setPage(next);
    setHistory(prev => [...prev, next]);
    setGenerated(false);
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function goBack() {
    if (history.length > 1) {
      const nextHistory = history.slice(0, -1);
      setHistory(nextHistory);
      setPage(nextHistory[nextHistory.length - 1]);
    } else {
      setPage('home');
      setHistory(['home']);
    }
    setGenerated(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  async function copyHud() {
    try {
      await navigator.clipboard.writeText(hudCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      const area = document.createElement('textarea');
      area.value = hudCode;
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  }
  function generateSensitivity() {
    setGenerated(true);
  }

  if (splash) return <div className="splash">
    <div className="splash-noise" />
    <div className="splash-mark"><span className="mark-slash">B</span><span>LACK</span></div>
    <div className="splash-line"><span /></div>
    <p>ENTER THE BATTLEFIELD</p>
  </div>;

  const activeSection = sections.find(s => s.id === page);

  return <div className="app-shell">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <header className="topbar">
      <button className="brand" onClick={() => navigate('home')} aria-label="الصفحة الرئيسية">
        <span className="brand-symbol">B</span><span className="brand-word">BLACK<span className="brand-dot">.</span><small>FREE FIRE HUB</small></span>
      </button>
      <nav className={`nav-links ${mobileMenu ? 'nav-open' : ''}`}>
        <button className={page === 'home' ? 'nav-active' : ''} onClick={() => navigate('home')}>الرئيسية</button>
        <button onClick={() => navigate('sensitivity')}>الحساسية</button>
        <button onClick={() => navigate('settings')}>إعداداتي</button>
        <button onClick={() => navigate('contact')}>تواصل</button>
      </nav>
      <button className="menu-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label="فتح القائمة">{mobileMenu ? <X/> : <Menu/>}</button>
      <div className="status-pill"><span className="status-dot"/> ONLINE HUB</div>
    </header>

    <main>
      {page === 'home' && <Home navigate={navigate} />}
      {page === 'sensitivity' && <PageFrame title="الحساسية الذكية" eyebrow="PLAYER TOOL" subtitle="أنشئ نقطة بداية لإعدادات تناسب جهازك وطريقة لعبك." onBack={goBack} icon={<Crosshair/>}>
        <div className="tool-layout">
          <div className="panel form-panel">
            <div className="panel-title"><Smartphone/><div><h3>خصّص إعداداتك</h3><p>أدخل معلومات جهازك للبدء</p></div></div>
            <label className="field-label" htmlFor="device-search">اسم الجهاز</label>
            <div className="input-wrap"><Smartphone size={18}/><input id="device-search" value={deviceQuery || device} onChange={e => {setDeviceQuery(e.target.value); setDevice(e.target.value); setGenerated(false);}} placeholder="مثال: Galaxy S23 Ultra" autoComplete="off"/></div>
            {filteredDevices.length > 0 && <div className="suggestions">{filteredDevices.map(d => <button key={d} onClick={() => {setDevice(d); setDeviceQuery('');}}>{d}<ArrowUpLeft size={15}/></button>)}</div>}
            <label className="field-label" htmlFor="play-style">أسلوب اللعب</label>
            <div className="select-wrap"><SlidersHorizontal size={18}/><select id="play-style" value={style} onChange={e => {setStyle(e.target.value); setGenerated(false);}}><option value="balanced">متوازن</option><option value="rush">هجومي / Rush</option><option value="precision">دقة وتحكم</option></select><ChevronDown size={17}/></div>
            <button className="primary-btn full-btn" onClick={generateSensitivity}><Sparkles size={18}/> إنشاء الحساسية <ArrowLeft size={18}/></button>
            <p className="fine-print"><ShieldCheck size={15}/> لا نطلب تسجيل الدخول أو بيانات شخصية.</p>
          </div>
          <div className="panel result-panel">
            <div className="result-top"><span className="result-icon"><Crosshair size={25}/></span><span className="mini-label">SENSITIVITY PROFILE</span></div>
            {!generated ? <div className="empty-result"><div className="target-art"><Crosshair size={64}/><span/></div><h3>إعداداتك تبدأ من هنا</h3><p>اختر جهازك واضغط على إنشاء الحساسية لعرض قيم مقترحة قابلة للتعديل داخل اللعبة.</p></div> :
              <><div className="result-device"><span>الجهاز المحدد</span><strong>{device || 'جهاز غير محدد'}</strong><em>{style === 'rush' ? 'أسلوب هجومي' : style === 'precision' ? 'أسلوب الدقة' : 'أسلوب متوازن'}</em></div>
              <div className="sensitivity-list">{Object.entries({
                'General': starterSensitivity.general + (style === 'rush' ? 5 : style === 'precision' ? -10 : 0),
                'Red Dot': starterSensitivity.redDot + (style === 'rush' ? 5 : style === 'precision' ? -10 : 0),
                '2x Scope': starterSensitivity.scope2x + (style === 'rush' ? 3 : style === 'precision' ? -10 : 0),
                '4x Scope': starterSensitivity.scope4x + (style === 'rush' ? 0 : style === 'precision' ? -10 : 0),
                'Sniper Scope': starterSensitivity.sniper,
                'Free Look': starterSensitivity.freeLook
              }).map(([label, value]) => <div className="sensitivity-row" key={label}><span>{label}</span><div className="meter"><i style={{width: `${Math.min(100, value / 2)}%`}}/></div><b>{value}</b></div>)}</div>
              <p className="notice">هذه قيم بداية تجريبية وليست قياسات مختبرة على كل جهاز. عدّلها حسب استجابة اللعبة وتفضيلاتك.</p>
              <button className="secondary-btn full-btn" onClick={() => setGenerated(false)}><RotateCcw size={17}/> تعديل الاختيارات</button></>}
          </div>
        </div>
      </PageFrame>}
      {page === 'download' && <PageFrame title="تحميل فري فاير" eyebrow="GAME DOWNLOAD" subtitle="رابط التنزيل الذي أضافه مطوّر BLACK." onBack={goBack} icon={<Download/>}>
        <div className="download-feature panel">
          <div className="download-visual"><div className="visual-glow"/><Gamepad2 size={96}/><span className="visual-label">FREE FIRE</span></div>
          <div className="download-copy"><span className="mini-label">EXTERNAL DOWNLOAD</span><h2>استعد للمعركة</h2><p>سيتم فتح صفحة MediaFire في تبويب جديد. تحقّق من مصدر ملف APK وسلامته قبل التثبيت، خاصةً إن كان إصدارًا قديمًا أو معدلًا.</p><a className="primary-btn link-btn" href={downloadUrl} target="_blank" rel="noopener noreferrer">الانتقال إلى التحميل <ExternalLink size={18}/></a><span className="fine-print"><ShieldCheck size={15}/> موقع BLACK لا يستضيف الملف بنفسه.</span></div>
        </div>
      </PageFrame>}
      {page === 'settings' && <PageFrame title="إعداداتي الخاصة" eyebrow="BLACK LOADOUT" subtitle="إعدادات BLACK الشخصية — Samsung Galaxy S23 Ultra." onBack={goBack} icon={<Target/>}>
        <div className="loadout-grid">
          <div className="panel hud-panel"><span className="mini-label">CUSTOM HUD CODE</span><div className="hud-emblem"><Target size={54}/><span>BLACK</span></div><h2>كود HUD الخاص بي</h2><p>انسخ الكود وجرب استيراده داخل اللعبة إذا كان إصدارك يدعمه.</p><div className="code-box"><code>{hudCode}</code><button onClick={copyHud} aria-label="نسخ الكود">{copied ? <Check size={19}/> : <Copy size={19}/>}</button></div>{copied && <div className="copy-success"><Check size={15}/> تم نسخ الكود</div>}</div>
          <div className="panel device-panel"><div className="device-glow"/><span className="mini-label">MY DEVICE</span><Smartphone size={48}/><h2>Galaxy S23 Ultra</h2><p>إعدادات حساسية مقترحة لتكون نقطة بداية، ويمكنك تعديلها حسب أسلوب لعبك.</p><button className="primary-btn full-btn" onClick={() => {setDevice('Samsung Galaxy S23 Ultra'); setPage('sensitivity'); setHistory(prev => [...prev, 'sensitivity']); setGenerated(true); window.scrollTo({top:0,behavior:'smooth'});}}>عرض الحساسية <ArrowLeft size={18}/></button></div>
        </div>
      </PageFrame>}
      {page === 'contact' && <PageFrame title="تواصل مع المطور" eyebrow="MEET THE CREATOR" subtitle="تابع آخر المستجدات وتواصل مع مجتمع BLACK." onBack={goBack} icon={<MessageCircle/>}>
        <div className="creator-hero panel"><div className="creator-avatar"><span>B</span><i/></div><div className="creator-info"><span className="mini-label">DEVELOPER & CREATOR</span><h2>BLACK<span className="brand-dot">.</span></h2><p>Gaming • Community • Free Fire</p><div className="creator-badge"><span className="status-dot"/> صانع محتوى ومطور المنصة</div></div><div className="creator-watermark">BLACK</div></div>
        <div className="social-grid">
          <a className="social-card whatsapp" href="https://wa.me/249999498099" target="_blank" rel="noopener noreferrer"><span className="social-icon"><MessageCircle/></span><div><small>CHAT DIRECTLY</small><h3>واتساب</h3><p>افتح محادثة مع المطور</p></div><ExternalLink/></a>
          <a className="social-card tiktok" href={tiktokUrl} target="_blank" rel="noopener noreferrer"><span className="social-icon social-letter">♪</span><div><small>FOLLOW THE CREATOR</small><h3>TikTok</h3><p>@black_a249</p></div><ExternalLink/></a>
          <a className="social-card discord" href={discordUrl} target="_blank" rel="noopener noreferrer"><span className="social-icon"><MessageCircle/></span><div><small>JOIN THE COMMUNITY</small><h3>Discord</h3><p>انضم إلى سيرفر BLACK</p></div><ExternalLink/></a>
        </div>
        <p className="notice">تم تكوين رابط واتساب باستخدام رمز السودان الدولي (+249). تأكد من أن الرقم صحيح وأنه يستقبل رسائل واتساب.</p>
      </PageFrame>}
      {page === 'store' && <PageFrame title="المتجر الإلكتروني" eyebrow="BLACK STORE" subtitle="مساحة جديدة قيد التجهيز." onBack={goBack} icon={<ShoppingBag/>}>
        <div className="coming-soon panel"><div className="store-orbit"><ShoppingBag size={54}/><span/><i/></div><span className="mini-label">SOMETHING IS LOADING</span><h2>قريبًا<span className="brand-dot">.</span></h2><p>نجهّز تجربة جديدة لمجتمع BLACK. عُد لاحقًا لاكتشافها.</p><button className="secondary-btn" onClick={goBack}><ArrowLeft size={18}/> الرجوع</button></div>
      </PageFrame>}
    </main>
    <footer className="footer"><div className="footer-brand"><span className="brand-symbol small-symbol">B</span><span>BLACK<span className="brand-dot">.</span></span></div><p>مجتمع فري فاير يبدأ من هنا.</p><span className="copyright">© {new Date().getFullYear()} BLACK HUB</span></footer>
  </div>;
}

function Home({ navigate }) {
  return <>
    <section className="hero">
      <div className="hero-copy"><div className="eyebrow"><span/> YOUR GAME. YOUR RULES.</div><h1>ارفع مستواك.<br/><span>العب بطريقتك.</span></h1><p>كل ما تحتاجه لتجربتك في فري فاير — إعدادات، أدوات، وكود BLACK الخاص.</p><div className="hero-actions"><button className="primary-btn" onClick={() => navigate('sensitivity')}>ابدأ الآن <ArrowLeft size={18}/></button><button className="ghost-btn" onClick={() => navigate('settings')}>إعدادات BLACK <Target size={17}/></button></div><div className="hero-stats"><div><b>01</b><span>اختر جهازك</span></div><div><b>02</b><span>خصص إعداداتك</span></div><div><b>03</b><span>ادخل المعركة</span></div></div></div>
      <div className="hero-art"><div className="hero-ring ring-one"/><div className="hero-ring ring-two"/><div className="hero-portrait"><img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1100&q=90" alt="أجواء ألعاب إلكترونية" /></div><div className="hero-stamp"><span>BLACK</span><b>GAMING HUB</b><i/></div><div className="floating-chip chip-top"><Crosshair size={16}/> AIM CONTROL</div><div className="floating-chip chip-bottom"><Zap size={16}/> READY TO PLAY</div></div>
      <div className="hero-bottom-label"><span>SCROLL TO EXPLORE</span><i/></div>
    </section>
    <section className="sections-section"><div className="section-heading"><div><span className="mini-label">EXPLORE THE HUB</span><h2>اختر <span>مهمتك</span></h2></div><p>خمسة أقسام، وتجربة واحدة مصممة للاعبين.</p></div><div className="section-grid">{sections.map((s, i) => <button className={`section-card card-${i+1}`} key={s.id} onClick={() => navigate(s.id)} style={{'--card-image': `url("${s.image}")`}}><div className="card-shade"/><div className="card-top"><span>{s.number}</span><span className="card-tag">{s.tag}</span></div><div className="card-content"><span className="card-icon"><Icon name={s.icon} size={25}/></span><h3>{s.title}</h3><p>{s.subtitle}</p><span className="card-cta">استكشف القسم <ArrowLeft size={16}/></span></div><div className="card-corner"><ArrowUpLeft size={21}/></div></button>)}</div></section>
    <section className="feature-strip"><div className="feature-item"><span><ShieldCheck/></span><div><b>تجربة واضحة</b><small>واجهات سهلة ومباشرة</small></div></div><div className="feature-item"><span><Zap/></span><div><b>سرعة وانسيابية</b><small>حركة خفيفة ومتجاوبة</small></div></div><div className="feature-item"><span><Smartphone/></span><div><b>مصمم للهاتف</b><small>يعمل على مختلف الشاشات</small></div></div></section>
  </>;
}

function PageFrame({ title, eyebrow, subtitle, onBack, icon, children }) {
  return <section className="subpage">
    <button className="back-btn" onClick={onBack}><ArrowRightIcon/> الرجوع</button>
    <div className="page-heading"><span className="page-heading-icon">{icon}</span><div><span className="mini-label">{eyebrow}</span><h1>{title}</h1><p>{subtitle}</p></div></div>
    {children}
  </section>;
}
function ArrowRightIcon() { return <ArrowLeft size={18}/>; }

export default App;