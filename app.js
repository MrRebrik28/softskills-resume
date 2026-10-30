/**
 * SoftSkills Resume Builder
 * Client-Side Dynamic Engine & High-Res JPG Exporter
 */

(function () {
  'use strict';

  // --- DEFAULT DEMO DATA TEMPLATE ---
  const DEFAULT_DEMO_DATA = {
    theme: 'theme-navy',
    photoUrl: '',
    selectedSpecialty: 'disaster_protection',
    personal: {
      fullname: 'Дмитрий Соколов',
      title: 'Специалист по защите в ЧС / Руководитель спасательной группы',
      email: 'sokolov.mchs@example.com',
      phone: '+7 (926) 777-33-44',
      telegram: '@sokolov_rescue',
      location: 'Москва • Готов к командировкам',
      portfolio: 'linkedin.com/in/dmitry-sokolov',
      summary: 'Специалист по защите в чрезвычайных ситуациях с развитыми надпрофессиональными компетенциями: лидерство в стрессовых условиях, оперативная координация команды, хладнокровие и принятие взвешенных решений в условиях неопределенности.'
    },
    experiences: [
      {
        id: 'exp-1',
        title: 'Командир отделения аварийно-спасательной группы',
        company: 'Центр гражданской защиты и спасательных операций',
        period: '2023 — Настоящее время',
        description: '• Руководство расчетом из 6 спасателей при проведении АСР повышенной сложности.\n• Внедрил алгоритмы бесконфликтной оперативной коммуникации по радиосвязи в зоне ЧС.\n• Провел успешную эвакуацию более 80 человек при ликвидации последствий весеннего паводка.'
      },
      {
        id: 'exp-2',
        title: 'Спасатель 2-го класса',
        company: 'Поисково-спасательный отряд',
        period: '2021 — 2023',
        description: '• Проведение поисково-спасательных работ в природной и техногенной среде.\n• Оказание первой доврачебной помощи и психологической поддержки пострадавшим.\n• Менторство и полевая адаптация 5 молодых стажеров-спасателей.'
      }
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'Защита в чрезвычайных ситуациях (Техник-спасатель)',
        school: 'Колледж противопожарной и спасательной службы',
        period: '2019 — 2023'
      }
    ],
    softSkills: [
      'Эмоциональный интеллект',
      'Принятие решений в неопределенности',
      'Управление конфликтами',
      'Критическое мышление',
      'Кросс-функциональное лидерство',
      'Ассертивная коммуникация',
      'Адаптивность к изменениям',
      'Наставничество и менторинг'
    ],
    hardSkills: [
      'Проведение аварийно-спасательных работ (АСР)',
      'Оказание первой помощи пострадавшим при ЧС',
      'Эксплуатация аварийно-спасательного инструмента (ГАСИ)',
      'Радиационная и химическая разведка (ВПХР, ДП-5)',
      'Топография, картография и радиосвязь'
    ],
    achievements: [
      'Награжден ведомственным знаком отличия за спасение людей и предотвращение техногенной аварии.',
      'Сократил время развертывания гидравлического аварийно-спасательного инструмента (ГАСИ) на 25% благодаря оптимизации командных ролей.',
      'Провел более 15 открытых уроков и практических тренировок по действиям в ЧС для студентов и школьников.'
    ],
    languages: [
      { id: 'lang-1', name: 'Русский', level: 'Родной' },
      { id: 'lang-2', name: 'Английский', level: 'B1 — Intermediate' }
    ],
    courses: [
      { id: 'crs-1', text: 'Курс: «Надпрофессиональные компетенции современного специалиста» (2026)' },
      { id: 'crs-2', text: 'Сертификация по ликвидации медико-санитарных последствий ЧС (2025)' }
    ]
  };

  // --- LOCAL PERSISTENCE & AUTO-SAVE ENGINE ---
  const STORAGE_KEY = 'softskills_resume_data_v1';
  let saveDebounceTimer = null;

  // Active state initialized as a deep copy of template
  const state = JSON.parse(JSON.stringify(DEFAULT_DEMO_DATA));

  function updateSaveIndicator(text, isSaving = false) {
    const el = document.getElementById('save-status-text');
    const dot = document.getElementById('save-status-dot');
    if (el) el.textContent = text;
    if (dot) {
      if (isSaving) {
        dot.style.background = '#f59e0b';
        dot.style.boxShadow = '0 0 0 2px rgba(245, 158, 11, 0.25)';
      } else {
        dot.style.background = 'var(--success)';
        dot.style.boxShadow = '0 0 0 2px rgba(16, 185, 129, 0.2)';
      }
    }
  }

  function saveStateToStorage() {
    updateSaveIndicator('Сохранение...', true);
    if (saveDebounceTimer) clearTimeout(saveDebounceTimer);
    saveDebounceTimer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        updateSaveIndicator('Сохранено локально', false);
      } catch (err) {
        console.warn('Не удалось сохранить в localStorage:', err);
        updateSaveIndicator('Память заполнена', false);
      }
    }, 250);
  }

  function loadStateFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          // Deep merge into state
          Object.assign(state, parsed);
          if (parsed.personal) {
            state.personal = Object.assign({}, DEFAULT_DEMO_DATA.personal, parsed.personal);
          }
          return true;
        }
      }
    } catch (err) {
      console.warn('Ошибка чтения из localStorage:', err);
    }
    return false;
  }

  function applyState(newState) {
    Object.keys(state).forEach(key => delete state[key]);
    Object.assign(state, JSON.parse(JSON.stringify(newState)));
  }

  // --- SPECIALTIES HARD SKILLS DICTIONARY ---
  const SPECIALTIES_DATA = {
    law: {
      name: 'Юристы',
      skills: [
        'Правовая экспертиза договоров',
        'Анализ нормативно-правовых актов (НПА)',
        'Составление процессуальных документов (иски, жалобы)',
        'Работа в СПС «КонсультантПлюс» / «Гарант»',
        'Представительство в судах и госорганах',
        'Знание ГК РФ, ТК РФ, АПК РФ',
        'Досудебное претензионное производство',
        'Юридический аудит и комплаенс',
        'Ведение юридического делопроизводства'
      ]
    },
    fire_safety: {
      name: 'Пожарная безопасность',
      skills: [
        'Расчет и оценка пожарных рисков',
        'Эксплуатация пожарно-технического вооружения (ПТВ)',
        'Аудит систем пожарной безопасности объектов',
        'Монтаж и ТО систем АПС, СОУЭ и АУПТ',
        'Знание норм ФЗ №123-ФЗ и Сводов правил (СП)',
        'Разработка планов эвакуации и инструкций ПБ',
        'Работа в средствах защиты СИЗОД',
        'Организация и проведение эвакуации людей',
        'Пожарно-профилактическая работа на предприятиях'
      ]
    },
    disaster_protection: {
      name: 'Защита в ЧС',
      skills: [
        'Проведение аварийно-спасательных работ (АСР)',
        'Оказание первой помощи пострадавшим при ЧС',
        'Эксплуатация аварийно-спасательного инструмента (ГАСИ)',
        'Радиационная и химическая разведка (ВПХР, ДП-5)',
        'Работа со средствами индивидуальной защиты (СИЗ)',
        'Организация пунктов временного размещения (ПВР)',
        'Топография, картография и радиосвязь',
        'Ликвидация последствий стихийных бедствий и аварий',
        'Альпинистская и высотная спасательная подготовка'
      ]
    },
    law_enforcement: {
      name: 'Правоохранительная деятельность',
      skills: [
        'Квалификация административных правонарушений и преступлений',
        'Составление протоколов и процессуальной документации',
        'Тактика осмотра места происшествия',
        'Криминалистическая техника (дактилоскопия, фиксация следов)',
        'Работа с ведомственными базами данных',
        'Огневая подготовка и применение спецсредств',
        'Охрана общественного порядка и безопасность',
        'Профилактика правонарушений и работа с гражданами',
        'Знание КоАП РФ, УК РФ, УПК РФ и ФЗ «О полиции»'
      ]
    },
    mechanics: {
      name: 'Механики',
      skills: [
        'Чтение машиностроительных чертежей и кинематических схем',
        'Техническое обслуживание и ремонт оборудования',
        'Диагностика и дефектовка узлов и механизмов',
        'Работа с контрольно-измерительным инструментом (микрометр, штангенциркуль)',
        'Знание допусков, посадок и технических измерений (ЕСДП)',
        'Базовое проектирование в КОМПАС-3D / AutoCAD',
        'Обслуживание гидравлических и пневматических систем',
        'Слесарная обработка деталей и центровка валов',
        'Наладка станков и технологических линий'
      ]
    },
    electricians: {
      name: 'Электрики',
      skills: [
        'Чтение принципиальных и однолинейных электросхем',
        'Монтаж и эксплуатация электроустановок до 1000В',
        'Работа с электроизмерительными приборами (мультиметр, мегаомметр)',
        'Сборка и пусконаладка щитов управления (ВРУ, ЩО, ШУ)',
        'Соблюдение норм ПУЭ, ПТЭЭП и правил охраны труда',
        'Поиск и устранение обрывов и неисправностей в электроцепях',
        'Подключение асинхронных электродвигателей и аппаратуры',
        'Прокладка кабельных трасс и расключение коробок',
        'Группа допуска по электробезопасности'
      ]
    },
    automation_operators: {
      name: 'Операторы АСУ',
      skills: [
        'Мониторинг технологических процессов через SCADA-системы',
        'Конфигурирование промышленных контроллеров (ПЛК / PLC)',
        'Работа с промышленными протоколами (Modbus RTU/TCP, Profibus)',
        'Диагностика датчиков КИПиА (температура, давление, уровень)',
        'Базовые знания языков МЭК 61131-3 (FBD, LAD, ST)',
        'Управление с операторских панелей (HMI)',
        'Настройка контуров регулирования (ПИД-регуляторы)',
        'Чтение функциональных схем автоматизации',
        'Оперативное реагирование на аварийные сигналы АСУ ТП'
      ]
    },
    dispatchers_emergency: {
      name: 'Диспетчера (ЧС)',
      skills: [
        'Прием и оперативная обработка экстренных вызовов (Система-112)',
        'Маршрутизация оперативных служб (01, 02, 03, 04)',
        'Работа в специализированном ПО ЕДДС / АИУС РСЧС',
        'Координация сил и средств экстренного реагирования',
        'Ведение электронных журналов оперативной обстановки',
        'Алгоритмический опрос заявителя в стрессовых ситуациях',
        'Организация оперативной телефонной и радиосвязи',
        'Оповещение руководящего состава и дежурно-диспетчерских служб',
        'Принятие решений в условиях жесткого дефицита времени'
      ]
    }
  };

  // --- DOM SELECTORS ---
  const resumeCanvas = document.getElementById('resume-canvas-target');
  const downloadModal = document.getElementById('download-modal');
  const toastEl = document.getElementById('toast');

  // Helper: Show Toast
  function showToast(message, duration = 3000) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.remove('hidden');
    setTimeout(() => {
      toastEl.classList.add('hidden');
    }, duration);
  }

  // Helper: Initials generator for fallback avatar
  function getInitials(name) {
    if (!name) return '??';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }

  // --- RENDER FUNCTIONS FOR RESUME PREVIEW ---
  function updatePreview() {
    // 1. Theme class
    resumeCanvas.className = `resume-sheet ${state.theme}`;

    // 2. Personal info
    document.getElementById('cv-name').textContent = state.personal.fullname || 'Имя Фамилия';
    document.getElementById('cv-title').textContent = state.personal.title || 'Желаемая позиция';
    document.getElementById('cv-summary').textContent = state.personal.summary || '';

    // Initials fallback & photo
    const avatarImg = document.getElementById('resume-avatar-img');
    const avatarFallback = document.getElementById('resume-avatar-fallback');
    if (state.photoUrl) {
      avatarImg.src = state.photoUrl;
      avatarImg.classList.remove('hidden');
      avatarFallback.classList.add('hidden');
    } else {
      avatarImg.classList.add('hidden');
      avatarFallback.classList.remove('hidden');
      avatarFallback.textContent = getInitials(state.personal.fullname);
    }

    // 3. Contacts
    updateContactRow('cv-email', 'cv-email-row', state.personal.email);
    updateContactRow('cv-phone', 'cv-phone-row', state.personal.phone);
    updateContactRow('cv-telegram', 'cv-telegram-row', state.personal.telegram);
    updateContactRow('cv-location', 'cv-location-row', state.personal.location);
    updateContactRow('cv-portfolio', 'cv-portfolio-row', state.personal.portfolio);

    // 4. Soft Skills
    const softContainer = document.getElementById('cv-soft-skills');
    softContainer.innerHTML = state.softSkills
      .map(skill => `<span class="cv-skill-pill soft">${escapeHtml(skill)}</span>`)
      .join('');

    // 5. Hard Skills
    const hardContainer = document.getElementById('cv-hard-skills');
    hardContainer.innerHTML = state.hardSkills
      .map(skill => `<span class="cv-skill-pill hard">${escapeHtml(skill)}</span>`)
      .join('');

    // 6. Experience
    const expList = document.getElementById('cv-experience-list');
    const expSec = document.getElementById('cv-experience-section');
    if (state.experiences.length === 0) {
      expSec.classList.add('hidden');
    } else {
      expSec.classList.remove('hidden');
      expList.innerHTML = state.experiences
        .map(exp => `
          <div class="cv-job-item">
            <div class="cv-job-header">
              <span class="cv-job-title">${escapeHtml(exp.title || 'Должность')}</span>
              <span class="cv-job-dates">${escapeHtml(exp.period || '')}</span>
            </div>
            <div class="cv-job-company">${escapeHtml(exp.company || '')}</div>
            <div class="cv-job-desc">${escapeHtml(exp.description || '')}</div>
          </div>
        `).join('');
    }

    // 7. Education
    const eduList = document.getElementById('cv-education-list');
    const eduSec = document.getElementById('cv-education-section');
    if (state.education.length === 0) {
      eduSec.classList.add('hidden');
    } else {
      eduSec.classList.remove('hidden');
      eduList.innerHTML = state.education
        .map(edu => `
          <div class="cv-edu-item">
            <div class="cv-edu-degree">${escapeHtml(edu.degree || '')}</div>
            <div class="cv-edu-school">${escapeHtml(edu.school || '')}</div>
            ${edu.period ? `<div class="cv-edu-year">${escapeHtml(edu.period)}</div>` : ''}
          </div>
        `).join('');
    }

    // 8. Achievements
    const achList = document.getElementById('cv-achievements-list');
    const achSec = document.getElementById('cv-achievements-section');
    if (state.achievements.length === 0) {
      achSec.classList.add('hidden');
    } else {
      achSec.classList.remove('hidden');
      achList.innerHTML = state.achievements
        .map(item => `
          <li class="cv-achievement-item">
            <span class="cv-achievement-icon">★</span>
            <span class="cv-achievement-text">${escapeHtml(item)}</span>
          </li>
        `).join('');
    }

    // 9. Languages
    const langList = document.getElementById('cv-languages-list');
    const langSec = document.getElementById('cv-languages-section');
    if (state.languages.length === 0) {
      langSec.classList.add('hidden');
    } else {
      langSec.classList.remove('hidden');
      langList.innerHTML = state.languages
        .map(l => `
          <li class="cv-lang-item">
            <span class="cv-lang-name">${escapeHtml(l.name)}</span>
            <span class="cv-lang-level">${escapeHtml(l.level)}</span>
          </li>
        `).join('');
    }

    // 10. Courses
    const crsList = document.getElementById('cv-courses-list');
    const crsSec = document.getElementById('cv-courses-section');
    if (state.courses.length === 0) {
      crsSec.classList.add('hidden');
    } else {
      crsSec.classList.remove('hidden');
      crsList.innerHTML = state.courses
        .map(c => `
          <li class="cv-course-item">${escapeHtml(c.text)}</li>
        `).join('');
    }

    // Date footer
    const now = new Date();
    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    document.getElementById('cv-current-date').textContent = `${months[now.getMonth()]} ${now.getFullYear()}`;

    // Auto-save state to localStorage
    saveStateToStorage();
  }

  function updateContactRow(textId, rowId, value) {
    const textEl = document.getElementById(textId);
    const rowEl = document.getElementById(rowId);
    if (!textEl || !rowEl) return;
    if (value && value.trim()) {
      textEl.textContent = value.trim();
      rowEl.classList.remove('hidden');
    } else {
      rowEl.classList.add('hidden');
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --- RENDER FORMS IN LEFT COLUMN ---
  function renderAllForms() {
    // Inputs
    document.getElementById('field-fullname').value = state.personal.fullname;
    document.getElementById('field-title').value = state.personal.title;
    document.getElementById('field-email').value = state.personal.email;
    document.getElementById('field-phone').value = state.personal.phone;
    document.getElementById('field-telegram').value = state.personal.telegram;
    document.getElementById('field-location').value = state.personal.location;
    document.getElementById('field-portfolio').value = state.personal.portfolio;
    document.getElementById('field-summary').value = state.personal.summary;

    // Avatar preview in form
    renderFormAvatar();

    // Theme selector
    const radio = document.querySelector(`input[name="resume-theme"][value="${state.theme}"]`);
    if (radio) radio.checked = true;

    // Dynamic lists
    renderExperienceForm();
    renderEducationForm();
    renderSoftSkillsTags();
    renderHardSkillsPresets();
    renderHardSkillsTags();
    renderAchievementsForm();
    renderLanguagesForm();
    renderCoursesForm();
  }

  function renderHardSkillsPresets() {
    const presetsContainer = document.getElementById('hard-skills-presets');
    const badgeEl = document.getElementById('current-specialty-badge');
    const selectEl = document.getElementById('select-specialty');

    if (selectEl) {
      selectEl.value = state.selectedSpecialty || '';
    }

    if (!state.selectedSpecialty || !SPECIALTIES_DATA[state.selectedSpecialty]) {
      if (badgeEl) {
        badgeEl.textContent = 'Специальность не выбрана';
        badgeEl.style.color = 'var(--text-muted)';
        badgeEl.style.background = 'var(--bg-subtle)';
        badgeEl.style.borderColor = 'var(--border-color)';
      }
      if (presetsContainer) {
        presetsContainer.innerHTML = '<p class="select-prompt">👆 Выберите специальность выше, чтобы открыть список профессиональных навыков</p>';
      }
      return;
    }

    const currentSpec = SPECIALTIES_DATA[state.selectedSpecialty];
    if (badgeEl) {
      badgeEl.textContent = currentSpec.name;
      badgeEl.style.color = 'var(--primary)';
      badgeEl.style.background = 'var(--primary-soft)';
      badgeEl.style.borderColor = '#bfdbfe';
    }

    if (presetsContainer) {
      presetsContainer.innerHTML = currentSpec.skills.map(skill => `
        <button type="button" class="preset-chip" data-skill="${escapeHtml(skill)}">+ ${escapeHtml(skill)}</button>
      `).join('');
    }
  }

  function renderFormAvatar() {
    const formImg = document.getElementById('avatar-preview-img');
    const formPlaceholder = document.getElementById('avatar-placeholder');
    const btnRemove = document.getElementById('btn-remove-photo');
    if (state.photoUrl) {
      formImg.src = state.photoUrl;
      formImg.classList.remove('hidden');
      formPlaceholder.classList.add('hidden');
      btnRemove.classList.remove('hidden');
    } else {
      formImg.classList.add('hidden');
      formPlaceholder.classList.remove('hidden');
      btnRemove.classList.add('hidden');
    }
  }

  function renderExperienceForm() {
    const container = document.getElementById('experience-list');
    container.innerHTML = state.experiences.map((exp, index) => `
      <div class="dynamic-item-card" data-id="${exp.id}">
        <div class="item-card-header">
          <span class="item-index-badge">Место работы #${index + 1}</span>
          <button type="button" class="btn-icon-danger btn-remove-exp" data-id="${exp.id}" title="Удалить">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
        <div class="grid-2">
          <div class="input-group">
            <label>Должность</label>
            <input type="text" class="exp-title-input" value="${escapeHtml(exp.title)}" placeholder="Например: Team Lead">
          </div>
          <div class="input-group">
            <label>Компания / Проект</label>
            <input type="text" class="exp-company-input" value="${escapeHtml(exp.company)}" placeholder="Название компании">
          </div>
        </div>
        <div class="input-group">
          <label>Период работы</label>
          <input type="text" class="exp-period-input" value="${escapeHtml(exp.period)}" placeholder="Например: 2022 — Настоящее время">
        </div>
        <div class="input-group">
          <label>Обязанности, влияние на команду и результаты</label>
          <textarea rows="3" class="exp-desc-input" placeholder="Опишите задачи и soft skills, проявленные в работе...">${escapeHtml(exp.description)}</textarea>
        </div>
      </div>
    `).join('');
  }

  function renderEducationForm() {
    const container = document.getElementById('education-list');
    container.innerHTML = state.education.map((edu, index) => `
      <div class="dynamic-item-card" data-id="${edu.id}">
        <div class="item-card-header">
          <span class="item-index-badge">Образование #${index + 1}</span>
          <button type="button" class="btn-icon-danger btn-remove-edu" data-id="${edu.id}" title="Удалить">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
        <div class="input-group">
          <label>Специальность / Степень</label>
          <input type="text" class="edu-degree-input" value="${escapeHtml(edu.degree)}" placeholder="Например: Бакалавр Менеджмента">
        </div>
        <div class="grid-2">
          <div class="input-group">
            <label>Учебное заведение</label>
            <input type="text" class="edu-school-input" value="${escapeHtml(edu.school)}" placeholder="Название ВУЗа">
          </div>
          <div class="input-group">
            <label>Год / Период</label>
            <input type="text" class="edu-period-input" value="${escapeHtml(edu.period)}" placeholder="2018 — 2022">
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderSoftSkillsTags() {
    const container = document.getElementById('soft-skills-tags');
    container.innerHTML = state.softSkills.map((skill, index) => `
      <span class="tag-pill soft">
        ${escapeHtml(skill)}
        <button type="button" class="tag-remove btn-del-soft" data-index="${index}" title="Удалить">×</button>
      </span>
    `).join('');
  }

  function renderHardSkillsTags() {
    const container = document.getElementById('hard-skills-tags');
    container.innerHTML = state.hardSkills.map((skill, index) => `
      <span class="tag-pill">
        ${escapeHtml(skill)}
        <button type="button" class="tag-remove btn-del-hard" data-index="${index}" title="Удалить">×</button>
      </span>
    `).join('');
  }

  function renderAchievementsForm() {
    const container = document.getElementById('achievement-list');
    container.innerHTML = state.achievements.map((ach, index) => `
      <div class="dynamic-item-card compact-item-row" data-index="${index}">
        <input type="text" class="ach-input" value="${escapeHtml(ach)}" placeholder="Опишите результат с цифрами или эффектом...">
        <button type="button" class="btn-icon-danger btn-remove-ach" data-index="${index}" title="Удалить">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </button>
      </div>
    `).join('');
  }

  function renderLanguagesForm() {
    const container = document.getElementById('language-list');
    container.innerHTML = state.languages.map((l, index) => `
      <div class="compact-item-row" data-id="${l.id}">
        <input type="text" class="lang-name-input" value="${escapeHtml(l.name)}" placeholder="Язык">
        <input type="text" class="lang-level-input" value="${escapeHtml(l.level)}" placeholder="Уровень (B2, C1...)">
        <button type="button" class="btn-icon-danger btn-remove-lang" data-id="${l.id}" title="Удалить">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </button>
      </div>
    `).join('');
  }

  function renderCoursesForm() {
    const container = document.getElementById('course-list');
    container.innerHTML = state.courses.map((c, index) => `
      <div class="compact-item-row" data-id="${c.id}">
        <input type="text" class="course-text-input" value="${escapeHtml(c.text)}" placeholder="Название курса / сертификата">
        <button type="button" class="btn-icon-danger btn-remove-crs" data-id="${c.id}" title="Удалить">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </button>
      </div>
    `).join('');
  }

  // --- EVENT LISTENERS & BINDINGS ---
  function initEvents() {
    // 1. Personal Inputs
    const fieldMap = {
      'field-fullname': 'fullname',
      'field-title': 'title',
      'field-email': 'email',
      'field-phone': 'phone',
      'field-telegram': 'telegram',
      'field-location': 'location',
      'field-portfolio': 'portfolio',
      'field-summary': 'summary'
    };

    Object.keys(fieldMap).forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', (e) => {
          state.personal[fieldMap[id]] = e.target.value;
          updatePreview();
        });
      }
    });

    // 2. Photo Upload with Auto-Optimization for Local Storage
    const inputPhoto = document.getElementById('input-photo');
    if (inputPhoto) {
      inputPhoto.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          if (file.size > 12 * 1024 * 1024) {
            alert('Пожалуйста, выберите изображение размером до 12 МБ.');
            return;
          }
          const reader = new FileReader();
          reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
              const maxDim = 450;
              let width = img.width;
              let height = img.height;
              if (width > maxDim || height > maxDim) {
                if (width > height) {
                  height = Math.round((height * maxDim) / width);
                  width = maxDim;
                } else {
                  width = Math.round((width * maxDim) / height);
                  height = maxDim;
                }
              }
              const canvas = document.createElement('canvas');
              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0, width, height);
              state.photoUrl = canvas.toDataURL('image/jpeg', 0.88);
              renderFormAvatar();
              updatePreview();
              showToast('Фотография сохранена');
            };
            img.src = event.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
    }

    const btnRemovePhoto = document.getElementById('btn-remove-photo');
    if (btnRemovePhoto) {
      btnRemovePhoto.addEventListener('click', () => {
        state.photoUrl = '';
        if (inputPhoto) inputPhoto.value = '';
        renderFormAvatar();
        updatePreview();
        showToast('Фотография удалена');
      });
    }

    // 3. Theme picker
    document.querySelectorAll('input[name="resume-theme"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        state.theme = e.target.value;
        updatePreview();
      });
    });

    // 4. Soft Skills quick presets & custom add
    const softPresets = document.getElementById('soft-skills-presets');
    if (softPresets) {
      softPresets.addEventListener('click', (e) => {
        const btn = e.target.closest('.preset-chip');
        if (btn) {
          const skill = btn.getAttribute('data-skill');
          if (skill && !state.softSkills.includes(skill)) {
            state.softSkills.push(skill);
            renderSoftSkillsTags();
            updatePreview();
          }
        }
      });
    }

    const inputNewSoft = document.getElementById('input-new-softskill');
    const btnAddSoft = document.getElementById('btn-add-softskill');
    function addCustomSoftSkill() {
      const val = inputNewSoft.value.trim();
      if (val && !state.softSkills.includes(val)) {
        state.softSkills.push(val);
        inputNewSoft.value = '';
        renderSoftSkillsTags();
        updatePreview();
      }
    }
    if (btnAddSoft) btnAddSoft.addEventListener('click', addCustomSoftSkill);
    if (inputNewSoft) {
      inputNewSoft.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          addCustomSoftSkill();
        }
      });
    }

    // Remove soft skill
    const softTagsContainer = document.getElementById('soft-skills-tags');
    if (softTagsContainer) {
      softTagsContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-del-soft');
        if (btn) {
          const index = parseInt(btn.getAttribute('data-index'), 10);
          state.softSkills.splice(index, 1);
          renderSoftSkillsTags();
          updatePreview();
        }
      });
    }

    // 5. Specialty Selection & Hard Skills
    const selectSpecialty = document.getElementById('select-specialty');
    if (selectSpecialty) {
      selectSpecialty.addEventListener('change', (e) => {
        state.selectedSpecialty = e.target.value;
        renderHardSkillsPresets();
        updatePreview();
        if (SPECIALTIES_DATA[state.selectedSpecialty]) {
          showToast(`Выбрано направление: ${SPECIALTIES_DATA[state.selectedSpecialty].name}`);
        }
      });
    }

    const hardPresets = document.getElementById('hard-skills-presets');
    if (hardPresets) {
      hardPresets.addEventListener('click', (e) => {
        const btn = e.target.closest('.preset-chip');
        if (btn) {
          const skill = btn.getAttribute('data-skill');
          if (skill && !state.hardSkills.includes(skill)) {
            state.hardSkills.push(skill);
            renderHardSkillsTags();
            updatePreview();
          }
        }
      });
    }

    const inputNewHard = document.getElementById('input-new-hardskill');
    const btnAddHard = document.getElementById('btn-add-hardskill');
    function addCustomHardSkill() {
      const val = inputNewHard.value.trim();
      if (val && !state.hardSkills.includes(val)) {
        state.hardSkills.push(val);
        inputNewHard.value = '';
        renderHardSkillsTags();
        updatePreview();
      }
    }
    if (btnAddHard) btnAddHard.addEventListener('click', addCustomHardSkill);
    if (inputNewHard) {
      inputNewHard.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          addCustomHardSkill();
        }
      });
    }

    // Remove hard skill
    const hardTagsContainer = document.getElementById('hard-skills-tags');
    if (hardTagsContainer) {
      hardTagsContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-del-hard');
        if (btn) {
          const index = parseInt(btn.getAttribute('data-index'), 10);
          state.hardSkills.splice(index, 1);
          renderHardSkillsTags();
          updatePreview();
        }
      });
    }

    // 6. Experience dynamic list
    document.getElementById('btn-add-experience').addEventListener('click', () => {
      state.experiences.push({
        id: 'exp-' + Date.now(),
        title: '',
        company: '',
        period: '',
        description: ''
      });
      renderExperienceForm();
      updatePreview();
    });

    const expListContainer = document.getElementById('experience-list');
    expListContainer.addEventListener('input', (e) => {
      const card = e.target.closest('.dynamic-item-card');
      if (!card) return;
      const id = card.getAttribute('data-id');
      const item = state.experiences.find(x => x.id === id);
      if (!item) return;

      if (e.target.classList.contains('exp-title-input')) item.title = e.target.value;
      if (e.target.classList.contains('exp-company-input')) item.company = e.target.value;
      if (e.target.classList.contains('exp-period-input')) item.period = e.target.value;
      if (e.target.classList.contains('exp-desc-input')) item.description = e.target.value;
      updatePreview();
    });

    expListContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-remove-exp');
      if (btn) {
        const id = btn.getAttribute('data-id');
        state.experiences = state.experiences.filter(x => x.id !== id);
        renderExperienceForm();
        updatePreview();
      }
    });

    // 7. Education dynamic list
    document.getElementById('btn-add-education').addEventListener('click', () => {
      state.education.push({
        id: 'edu-' + Date.now(),
        degree: '',
        school: '',
        period: ''
      });
      renderEducationForm();
      updatePreview();
    });

    const eduListContainer = document.getElementById('education-list');
    eduListContainer.addEventListener('input', (e) => {
      const card = e.target.closest('.dynamic-item-card');
      if (!card) return;
      const id = card.getAttribute('data-id');
      const item = state.education.find(x => x.id === id);
      if (!item) return;

      if (e.target.classList.contains('edu-degree-input')) item.degree = e.target.value;
      if (e.target.classList.contains('edu-school-input')) item.school = e.target.value;
      if (e.target.classList.contains('edu-period-input')) item.period = e.target.value;
      updatePreview();
    });

    eduListContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-remove-edu');
      if (btn) {
        const id = btn.getAttribute('data-id');
        state.education = state.education.filter(x => x.id !== id);
        renderEducationForm();
        updatePreview();
      }
    });

    // 8. Achievements dynamic list
    document.getElementById('btn-add-achievement').addEventListener('click', () => {
      state.achievements.push('');
      renderAchievementsForm();
      updatePreview();
    });

    const achListContainer = document.getElementById('achievement-list');
    achListContainer.addEventListener('input', (e) => {
      if (e.target.classList.contains('ach-input')) {
        const card = e.target.closest('.compact-item-row');
        const index = parseInt(card.getAttribute('data-index'), 10);
        state.achievements[index] = e.target.value;
        updatePreview();
      }
    });

    achListContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-remove-ach');
      if (btn) {
        const index = parseInt(btn.getAttribute('data-index'), 10);
        state.achievements.splice(index, 1);
        renderAchievementsForm();
        updatePreview();
      }
    });

    // 9. Languages
    document.getElementById('btn-add-language').addEventListener('click', () => {
      state.languages.push({
        id: 'lang-' + Date.now(),
        name: '',
        level: ''
      });
      renderLanguagesForm();
      updatePreview();
    });

    const langContainer = document.getElementById('language-list');
    langContainer.addEventListener('input', (e) => {
      const row = e.target.closest('.compact-item-row');
      if (!row) return;
      const id = row.getAttribute('data-id');
      const item = state.languages.find(x => x.id === id);
      if (!item) return;

      if (e.target.classList.contains('lang-name-input')) item.name = e.target.value;
      if (e.target.classList.contains('lang-level-input')) item.level = e.target.value;
      updatePreview();
    });

    langContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-remove-lang');
      if (btn) {
        const id = btn.getAttribute('data-id');
        state.languages = state.languages.filter(x => x.id !== id);
        renderLanguagesForm();
        updatePreview();
      }
    });

    // 10. Courses
    document.getElementById('btn-add-course').addEventListener('click', () => {
      state.courses.push({
        id: 'crs-' + Date.now(),
        text: ''
      });
      renderCoursesForm();
      updatePreview();
    });

    const crsContainer = document.getElementById('course-list');
    crsContainer.addEventListener('input', (e) => {
      const row = e.target.closest('.compact-item-row');
      if (!row) return;
      const id = row.getAttribute('data-id');
      const item = state.courses.find(x => x.id === id);
      if (!item) return;

      if (e.target.classList.contains('course-text-input')) item.text = e.target.value;
      updatePreview();
    });

    crsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-remove-crs');
      if (btn) {
        const id = btn.getAttribute('data-id');
        state.courses = state.courses.filter(x => x.id !== id);
        renderCoursesForm();
        updatePreview();
      }
    });

    // 11. Header Actions (Reset & Demo Load)
    document.getElementById('btn-clear-all').addEventListener('click', () => {
      if (confirm('Вы уверены, что хотите очистить форму? Все текущие данные будут сброшены.')) {
        applyState({
          theme: 'theme-navy',
          photoUrl: '',
          selectedSpecialty: '',
          personal: {
            fullname: '',
            title: '',
            email: '',
            phone: '',
            telegram: '',
            location: '',
            portfolio: '',
            summary: ''
          },
          experiences: [],
          education: [],
          softSkills: [],
          hardSkills: [],
          achievements: [],
          languages: [],
          courses: []
        });
        renderAllForms();
        updatePreview();
        showToast('Форма полностью очищена');
      }
    });

    document.getElementById('btn-load-demo').addEventListener('click', () => {
      applyState(DEFAULT_DEMO_DATA);
      renderAllForms();
      updatePreview();
      showToast('Загружен образец резюме для дисциплины');
    });

    // 12. Mobile Tab Switcher
    const tabBtns = document.querySelectorAll('.mobile-tab-btn');
    const editorPane = document.getElementById('editor-pane');
    const previewPane = document.getElementById('preview-pane');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.getAttribute('data-tab');
        if (tab === 'editor') {
          editorPane.classList.add('active');
          previewPane.classList.remove('active');
        } else {
          editorPane.classList.remove('active');
          previewPane.classList.add('active');
        }
      });
    });

    // 13. Print Action
    document.getElementById('btn-print-resume').addEventListener('click', () => {
      window.print();
    });

    // 14. Download JPG Action (1 Click)
    const downloadBtns = [
      document.getElementById('btn-download-jpg'),
      document.getElementById('btn-download-jpg-preview')
    ];

    downloadBtns.forEach(btn => {
      if (btn) {
        btn.addEventListener('click', handleDownloadJpg);
      }
    });

    // 15. QR Code Modal Actions
    const qrModal = document.getElementById('qr-modal');
    const btnShowQr = document.getElementById('btn-show-qr');
    const btnCloseQr = document.getElementById('btn-close-qr');
    const btnCopyQrLink = document.getElementById('btn-copy-qr-link');

    if (btnShowQr && qrModal) {
      btnShowQr.addEventListener('click', () => {
        qrModal.classList.remove('hidden');
      });
    }

    if (btnCloseQr && qrModal) {
      btnCloseQr.addEventListener('click', () => {
        qrModal.classList.add('hidden');
      });
    }

    if (qrModal) {
      qrModal.addEventListener('click', (e) => {
        if (e.target === qrModal) {
          qrModal.classList.add('hidden');
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && qrModal && !qrModal.classList.contains('hidden')) {
        qrModal.classList.add('hidden');
      }
    });

    if (btnCopyQrLink) {
      btnCopyQrLink.addEventListener('click', () => {
        const link = 'https://goo.su/nG2sP';
        navigator.clipboard.writeText(link).then(() => {
          showToast('✓ Ссылка скопирована в буфер обмена!');
        }).catch(() => {
          showToast('Ссылка: ' + link);
        });
      });
    }
  }

  // --- JPG EXPORT ENGINE ---
  async function handleDownloadJpg() {
    if (typeof html2canvas === 'undefined') {
      alert('Ошибка: библиотека html2canvas не загружена. Пожалуйста, проверьте подключение к сети.');
      return;
    }

    downloadModal.classList.remove('hidden');

    try {
      // Allow DOM to settle before rendering
      await new Promise(resolve => setTimeout(resolve, 250));

      const target = document.getElementById('resume-canvas-target');

      // html2canvas high-DPI configuration (scale: 2.5 gives crisp A4 image ~2000px width)
      const canvas = await html2canvas(target, {
        scale: 2.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: 1200, // ensure desktop layout is captured
        onclone: (clonedDoc) => {
          // Guarantee cloned resume sheet has standard desktop width
          const clonedResume = clonedDoc.getElementById('resume-canvas-target');
          if (clonedResume) {
            clonedResume.style.width = '794px';
            clonedResume.style.boxShadow = 'none';
          }
        }
      });

      // Export as JPG (quality 0.95 for stunning fidelity)
      const jpgDataUrl = canvas.toDataURL('image/jpeg', 0.95);

      // Create download trigger
      const cleanName = (state.personal.fullname || 'SoftSkills-Resume')
        .replace(/[^a-zA-Zа-яА-Я0-9_-]/g, '_');
      const filename = `Резюме_${cleanName}.jpg`;

      const link = document.createElement('a');
      link.href = jpgDataUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      downloadModal.classList.add('hidden');
      showToast('🎉 Резюме успешно сохранено в JPG!');
    } catch (err) {
      console.error('Ошибка экспорта JPG:', err);
      downloadModal.classList.add('hidden');
      alert('Произошла ошибка при экспорте изображения. Попробуйте еще раз или используйте кнопку "Печать".');
    }
  }

  // --- INITIALIZATION ---
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Restore state from localStorage if available
    const restored = loadStateFromStorage();
    if (restored) {
      updateSaveIndicator('Восстановлено из памяти браузера', false);
    } else {
      updateSaveIndicator('Сохранено локально', false);
    }

    // 2. Render all views and bind events
    renderAllForms();
    updatePreview();
    initEvents();
  });

})();
