document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scrolling for navigation links ---
    document.querySelectorAll('header nav a, .cta-button').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Image Modal Logic ---
    const modal = document.getElementById('imageModal');
    if (modal) {
        const modalImg = document.getElementById("modalImage");
        const captionText = document.getElementById("caption");
        
        document.querySelectorAll('.kitten-card img, .env-card img').forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function() {
                modal.style.display = "block";
                modalImg.src = this.src;
                captionText.innerHTML = this.alt;
            });
        });

        const closeModal = () => {
            modal.style.display = "none";
        }

        modal.querySelector('.close').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // --- Language Switcher Logic ---
    const translations = {
        en: {
            title: "Dark Clouds Cattery",
            cattery_name: "Dark Clouds Cattery",
            nav_home: "Home",
            nav_about: "About Us",
            nav_kittens: "Cat Showcase",
            nav_environment: "Cattery",
            nav_contact: "Contact",
            hero_title: "Welcome to Dark Clouds Cattery",
            hero_subtitle: "Dedicated to breeding the sweetest and healthiest Minuet & Munchkin cats.",
            hero_cta: "Meet Our Kittens",
            about_title: "About Us",
            about_welcome: "Welcome to Dark Clouds Cattery",
            about_p1: "We are a professional cattery registered with both The International Cat Association (TICA) and the Cat Fanciers' Association (CFA). We are wholeheartedly dedicated to breeding healthy, affectionate, and beautiful top-quality Minuet and Munchkin cats. At Dark Clouds Cattery, our respect for life and our professional breeding standards are the cornerstones of our pride.",
            about_home_title: "Our Home",
            about_p2: "To provide the most exceptional environment for our cats, we have established spacious, modern homes in two global locations:",
            about_location1_title: "<strong>China, Shenyang Headquarters</strong>",
            about_location1_desc: "Located in Shenyang, Liaoning, with a vast 1600 square meters of palace-like living and activity space for our cats.",
            about_location2_title: "<strong>UK, Southampton Branch</strong>",
            about_location2_desc: "A comfortable 500 square meter environment, currently undergoing expansion to provide the same high-quality cats for our overseas families.",
            about_p3: "We have meticulously designed facilities including a SPA & washing area, an independent medical area, a scientific nutrition catering area, and dedicated living quarters for kittens at different growth stages, ensuring every cat receives attentive scientific care and love from birth.",
            about_breeding_title: "Our Breeding Philosophy",
            about_p4: "We specialize in breeding healthy cats with \"big eyes and sweet looks.\" Every newborn kitten embodies our commitment to exceptional quality. We cultivate a rich variety of color series, including classic colors (golden & white, cream & white, calico, silver & white, blue & white) and rare colors (sun-colored golden shaded, caramel blue golden, blue golden, etc.). We firmly believe that every cat from Dark Clouds Cattery will be a perfect companion for your family, combining both beauty and health.",
            qualifications_title: "Our Qualifications",
            cert1_desc: "TICA Registered Cattery",
            cert2_desc: "CFA Registered Cattery",
            kittens_title: "Cat Showcase",
            kitten1_name: "Bubble",
            kitten1_desc: "Minuet | Silver & White",
            kitten2_name: "Egg Tart",
            kitten2_desc: "Munchkin | Gold & White",
            kitten3_name: "Snowball",
            kitten3_desc: "Minuet | Cream White",
            kitten4_name: "Dango",
            kitten4_desc: "Munchkin | Blue Golden",
            environment_title: "Cattery Environment",
            env1_desc: "Spacious and bright hall",
            env2_desc: "SPA & Washing Area",
            env3_desc: "Independent Medical Area",
            env4_desc: "Scientific Nutrition Area",
            env5_desc: "Kitten Area A",
            env6_desc: "Kitten Area B",
            contact_title: "Contact Us",
            address_title: "Our Addresses",
            follow_title: "Follow Us",
            certs: "TICA/CFA Registered Cattery",
            copyright: "&copy; 2024 Dark Clouds Cattery. All Rights Reserved."
        },
        zh: {
            title: "乌云猫舍 - Dark Clouds Cattery",
            cattery_name: "乌云猫舍",
            nav_home: "首页",
            nav_about: "关于我们",
            nav_kittens: "猫猫展示",
            nav_environment: "猫舍环境",
            nav_contact: "联系我们",
            hero_title: "欢迎来到乌云猫舍",
            hero_subtitle: "致力于繁育最甜美健康的米努特与曼基康猫咪",
            hero_cta: "了解我们的猫咪",
            about_title: "关于我们",
            about_welcome: "欢迎来到乌云猫舍",
            about_p1: "我们是一家在国际权威爱猫协会 TICA 与 CFA 双重注册的专业猫舍，全身心致力于繁育健康、亲人且拥有甜美长相的顶级米努特（Minuet）与曼基康（Munchkin）猫咪。在乌云猫舍，我们对生命的尊重与对繁育的专业，是我们引以为傲的基石。",
            about_home_title: "我们的家园",
            about_p2: "为了给猫咪们提供最卓越的成长环境，我们在全球两地设立了宽敞、现代化的家园：",
            about_location1_title: "<strong>中国沈阳总部</strong>",
            about_location1_desc: "坐落于辽宁省沈阳市，占地面积高达1600平方米，为猫咪们提供了宫殿级的广阔活动与生活空间。",
            about_location2_title: "<strong>英国南安普顿分部</strong>",
            about_location2_desc: "拥有500平方米的舒适环境，目前仍在扩建升级中，旨在为我们的海外家庭提供同样高品质的猫咪。",
            about_p3: "我们精心设计了包括SPA洗护区、独立医疗区、科学营养配餐区以及不同成长阶段的幼猫专属生活区，确保每一只猫咪自出生起，就能享受到无微不至的科学照料与关爱。",
            about_breeding_title: "我们的繁育理念",
            about_p4: "我们专注于繁育拥有“大眼睛、甜美长相”的健康猫咪，每一只新生的小猫都承载着我们对卓越品质的执着追求。我们精心培育的颜色系列丰富多样，涵盖经典色系（金白、乳白、三花、银白、蓝白）与稀有色系（太阳色金渐层、焦糖蓝金、蓝金等）。我们坚信，每一只从乌云猫舍走出的猫咪，都将是您家庭中颜值与健康并存的完美伴侣。",
            qualifications_title: "我们的资质",
            cert1_desc: "TICA 注册猫舍",
            cert2_desc: "CFA 注册猫舍",
            kittens_title: "猫猫展示",
            kitten1_name: "泡泡",
            kitten1_desc: "米努特 | 银白",
            kitten2_name: "蛋挞",
            kitten2_desc: "曼基康 | 金白",
            kitten3_name: "雪球",
            kitten3_desc: "米努特 | 乳白",
            kitten4_name: "团子",
            kitten4_desc: "曼基康 | 蓝金",
            environment_title: "猫舍环境",
            env1_desc: "宽敞明亮的大厅",
            env2_desc: "SPA洗护区",
            env3_desc: "独立医疗区",
            env4_desc: "科学营养配餐区",
            env5_desc: "幼猫A区",
            env6_desc: "幼猫B区",
            contact_title: "联系我们",
            address_title: "我们的地址",
            follow_title: "关注我们",
            certs: "TICA/CFA 注册猫舍",
            copyright: "&copy; 2024 乌云猫舍 | Dark Clouds Cattery. All Rights Reserved."
        }
    };

    const langSwitcher = document.querySelector('.language-switcher button');
    let currentLang = localStorage.getItem('lang') || 'zh';

    const setLanguage = (lang) => {
        if (!['zh', 'en'].includes(lang)) {
            lang = 'zh';
        }
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
        currentLang = lang;
        localStorage.setItem('lang', lang);

        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.getAttribute('data-lang-key');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        // Also translate placeholder content
        document.querySelectorAll('.cert-image-placeholder').forEach(el => {
            el.setAttribute('data-placeholder-text-en', 'Certificate Image');
            el.setAttribute('data-placeholder-text-zh', '资质图片');
            
            const placeholderText = lang === 'zh' ? el.getAttribute('data-placeholder-text-zh') : el.getAttribute('data-placeholder-text-en');
            el.style.setProperty('--placeholder-text', `'${placeholderText}'`);
        });
    };

    langSwitcher.addEventListener('click', () => {
        const newLang = currentLang === 'zh' ? 'en' : 'zh';
        setLanguage(newLang);
    });

    setLanguage(currentLang);
});