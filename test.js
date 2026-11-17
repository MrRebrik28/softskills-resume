/**
 * Soft Skills Testing Engine (test.js)
 * Covers: Teamwork, Resume & Self-Presentation, Leadership, 4K Competencies
 * Includes: 15-Minute Timer, Strict Anti-Cheat (Tab-Switch Detection), Review & JPG Certificate Export
 */

(function () {
  'use strict';

  // --- QUESTIONS DATABASE (Strictly derived from the 4 presentation decks) ---
  const QUESTIONS_DATA = [
    // --- TOPIC 1: КОМАНДНАЯ РАБОТА ---
    {
      id: 1,
      topic: 'Командная работа',
      question: 'Почему командная работа считается важным фактором эффективности современного специалиста?',
      options: [
        'Синергия идей, взаимная проверка для снижения ошибок и ускорение процессов за счет распределения ролей',
        'Позволяет полностью переложить свои обязанности на коллег',
        'Исключает необходимость индивидуальной ответственности за результат',
        'Полностью заменяет профессиональные технические знания (Hard Skills)'
      ],
      correct: 0,
      explanation: 'Презентация 1, слайд 2: командная работа обеспечивает синергию идей, взаимную проверку, ускорение процессов и рост вовлеченности.'
    },
    {
      id: 2,
      topic: 'Командная работа',
      question: 'Что из перечисленного, согласно материалам, является одной из трех основ успешной команды?',
      options: [
        'Внутренняя конкуренция между участниками за лидерство',
        'Общие цели — четкое понимание «зачем мы здесь», взаимное доверие и открытость',
        'Единоличное принятие всех решений без обсуждения',
        'Запрет на признание ошибок перед коллегами'
      ],
      correct: 1,
      explanation: 'Презентация 1, слайд 4: основы успешной команды — 1. Общие цели, 2. Взаимное доверие, 3. Открытость (свобода высказывать идеи и ошибки).'
    },
    {
      id: 3,
      topic: 'Командная работа',
      question: 'Какую функцию выполняет роль «Критик» в команде согласно модели Белбина?',
      options: [
        'Является главным источником креатива и нестандартных идей',
        'Анализирует риски',
        'Организует процесс и ставит дедлайны',
        'Поддерживает теплую эмоциональную атмосферу'
      ],
      correct: 1,
      explanation: 'Презентация 1, слайд 5: в модели Белбина Генератор идей дает креатив, Координатор организует, Исполнитель реализует, Критик — анализирует риски, Душа команды — поддерживает атмосферу.'
    },
    {
      id: 4,
      topic: 'Командная работа',
      question: 'В чем заключается алгоритм командной практики «Дерево целей»?',
      options: [
        'Записать главную цель команды → разбить на подцели (ветви) → определить задачи (листья) → назначить ответственных',
        'Посадить дерево на субботнике для сплочения коллектива',
        'Собрать все цели в закрытый документ, доступный только руководителю',
        'Выбрать одну задачу и запретить ее дальнейшее деление'
      ],
      correct: 0,
      explanation: 'Презентация 1, слайд 6: алгоритм практики «Дерево целей»: 1. Главная цель, 2. Подцели (ветви), 3. Задачи (листья), 4. Назначение ответственных.'
    },
    {
      id: 5,
      topic: 'Командная работа',
      question: 'В ежедневной рутине «15 минут единства» на что отводится 5 минут в середине рабочего дня?',
      options: [
        'На планирование задач на завтрашний день',
        'На синхронизацию («Где мы сейчас?»)',
        'На вечернюю рефлексию («Что получилось / не получилось?»)',
        'На утренний план («Что важно сегодня?»)'
      ],
      correct: 1,
      explanation: 'Презентация 1, слайд 9: начало дня — 5 мин на план, середина дня — 5 мин на синхронизацию («Где мы сейчас?»), конец дня — 5 мин на рефлексию.'
    },
    {
      id: 6,
      topic: 'Командная работа',
      question: 'Какой главный развивающий эффект дает командная практика «Обмен ролями» (когда участники на 1 день меняются функциями)?',
      options: [
        'Развитие эмпатии и глубокое понимание чужой нагрузки и специфики задач',
        'Автоматическое повышение заработной платы напарника',
        'Поиск поводов для критики и штрафов',
        'Полная отмена разделения обязанностей в организации'
      ],
      correct: 0,
      explanation: 'Презентация 1, слайд 11: главный эффект практики «Обмен ролями» — эмпатия и понимание чужой нагрузки.'
    },

    // --- TOPIC 2: РЕЗЮМЕ И САМОПРЕЗЕНТАЦИЯ ---
    {
      id: 7,
      topic: 'Резюме и самопрезентация',
      question: 'Что такое самопрезентация в профессиональном контексте?',
      options: [
        'Искусство осознанно и эффективно представлять себя, показывать свои сильные стороны, навыки и опыт в выгодном свете',
        'Хвастовство и демонстрация превосходства над другими кандидатами',
        'Заучивание наизусть своей автобиографии с детских лет',
        'Исключительно публикация фотографий в социальных сетях'
      ],
      correct: 0,
      explanation: 'Презентация 2, слайд 2: самопрезентация — это не про хвастовство, а про умение осознанно показать свои сильные стороны, навыки и опыт.'
    },
    {
      id: 8,
      topic: 'Резюме и самопрезентация',
      question: 'Сколько времени в среднем есть у соискателя, чтобы произвести первое впечатление на работодателя своим резюме?',
      options: [
        '15–30 секунд',
        '10–15 минут',
        'Не менее 1 часа',
        'Целый рабочий день'
      ],
      correct: 0,
      explanation: 'Презентация 2, слайд 4: у вас есть всего 15–30 секунд, чтобы произвести первое впечатление на листе бумаги!'
    },
    {
      id: 9,
      topic: 'Резюме и самопрезентация',
      question: 'Что рекомендуется указывать в графе «Опыт работы» студенту 1–2 курса, если у него еще нет официальной трудовой книжки?',
      options: [
        'Волонтерство, учебные и командные проекты, участие в олимпиадах, профильные хобби и подработки',
        'Оставить поле пустым или написать «Опыта нет»',
        'Придумать вымышленную руководящую должность',
        'Указать только домашние обязанности'
      ],
      correct: 0,
      explanation: 'Презентация 2, слайд 7: опыт — это не только официальная работа, но и волонтерство, учебные проекты, олимпиады, профильные хобби и подработки.'
    },
    {
      id: 10,
      topic: 'Резюме и самопрезентация',
      question: 'Каковы скрытые правила оформления профессионального резюме?',
      options: [
        'Объем не более 1–2 страниц, ключевые слова из вакансии, чистый шрифт, много «воздуха» и проверка грамотности',
        'Чем больше страниц (от 5 до 10), тем выше шанс получить работу',
        'Использование ярких цветных рукописных шрифтов для привлечения внимания',
        'Сплошной монолитный текст без абзацев и списков'
      ],
      correct: 0,
      explanation: 'Презентация 2, слайд 9: краткость (1–2 страницы), ориентированность на вакансию, ключевые слова, профессиональный шрифт и ноль ошибок.'
    },
    {
      id: 11,
      topic: 'Резюме и самопрезентация',
      question: 'Как правильно структурировать ответ на собеседовании на классический вопрос «Расскажите о себе»?',
      options: [
        'Настоящее (кто вы сейчас) → Прошлое (какой опыт привел вас сюда) → Будущее (кем хотите стать и почему интересна эта позиция)',
        'Подробный пересказ всей своей жизни начиная с детского сада',
        'Сказать «Все написано в резюме, читайте сами»',
        'Рассказать исключительно о своих увлечениях и любимых фильмах'
      ],
      correct: 0,
      explanation: 'Презентация 2, слайд 13: формула ответа: Настоящее (кто вы сейчас) → Прошлое (каков ваш опыт) → Будущее (кем хотите стать и почему интересна компания).'
    },
    {
      id: 12,
      topic: 'Резюме и самопрезентация',
      question: 'Какой вопрос кандидату уместно и полезно задать работодателю в конце собеседования?',
      options: [
        '«Какие задачи будут входить в мои обязанности и каким вы видите идеального кандидата?»',
        '«Сколько длится перерыв на обед и можно ли уходить раньше?»',
        '«Когда мне повысят зарплату в два раза?»',
        '«Можно ли не приходить на работу по понедельникам?»'
      ],
      correct: 0,
      explanation: 'Презентация 2, слайд 14: умные вопросы показывают заинтересованность: задачи, образ идеального кандидата, возможности роста.'
    },

    // --- TOPIC 3: ЛИДЕРСТВО И НАВЫКИ ВЛИЯНИЯ ---
    {
      id: 13,
      topic: 'Лидерство и влияние',
      question: 'Что лежит в основе эффективного лидерства в современной команде?',
      options: [
        'Искусство вдохновлять и направлять команду к общим целям, демонстрируя личный пример',
        'Авторитарный контроль каждого действия и постоянные штрафы',
        'Перекладывание ответственности за сложные решения на подчиненных',
        'Выполнение всей работы лидером в одиночку из-за недоверия к коллективу'
      ],
      correct: 0,
      explanation: 'Презентация 3, слайд 2: лидерство — это искусство вдохновлять и направлять к общим целям, демонстрируя личный пример.'
    },
    {
      id: 14,
      topic: 'Лидерство и влияние',
      question: 'Какие три ключевых аспекта и качества определяют понимание настоящего лидерства?',
      options: [
        'Видение и стратегия, коммуникация и вдохновение, принятие решений и ответственность',
        'Жесткость, скрытность и категоричный отказ от компромиссов',
        'Потакание любым капризам сотрудников и отсутствие требований',
        'Исключительно стаж работы в организации свыше 20 лет'
      ],
      correct: 0,
      explanation: 'Презентация 3, слайд 3: 1. Видение и стратегия, 2. Коммуникация и вдохновение, 3. Принятие решений и ответственность.'
    },
    {
      id: 15,
      topic: 'Лидерство и влияние',
      question: 'Какую роль играет эмоциональный интеллект (EQ) в лидерской коммуникации?',
      options: [
        'Понимание эмоций и настроений команды позволяет выстраивать более вовлекающую и доверительную коммуникацию',
        'Позволяет манипулировать людьми для достижения корыстных целей',
        'Исключает необходимость слушать проблемы сотрудников',
        'Заставляет скрывать любые эмоции и быть абсолютно холодным'
      ],
      correct: 0,
      explanation: 'Презентация 3, слайд 4: эмоциональный интеллект — понимание эмоций и настроений команды для вовлекающей коммуникации.'
    },
    {
      id: 16,
      topic: 'Лидерство и влияние',
      question: 'Каков правильный порядок этапов при вовлечении сотрудников в процесс принятия решений?',
      options: [
        '1. Сбор идей → 2. Обсуждение и анализ (оценка плюсов и рисков) → 3. Совместное принятие решений',
        '1. Единоличное решение лидера → 2. Доведение приказа → 3. Сбор идей после завершения',
        '1. Голосование вслепую → 2. Наказание несогласных',
        '1. Отказ от обсуждения → 2. Перекладывание решения на клиента'
      ],
      correct: 0,
      explanation: 'Презентация 3, слайд 6: этапы вовлечения: 1. Сбор идей, 2. Обсуждение и анализ, 3. Принятие решений.'
    },
    {
      id: 17,
      topic: 'Лидерство и влияние',
      question: 'Что из перечисленного является конструктивным методом управления конфликтами для лидера?',
      options: [
        'Открытое обсуждение в безопасной среде, поиск взаимовыгодных компромиссов, проявление эмпатии и гибкость',
        'Игнорирование конфликта в надежде, что он пройдет сам собой',
        'Публичное высмеивание спорящих участников перед всем коллективом',
        'Увольнение одного из спорящих без выяснения причин'
      ],
      correct: 0,
      explanation: 'Презентация 3, слайд 8: управление конфликтами включает открытое обсуждение, поиск компромиссов, проявление эмпатии и развитие гибкости.'
    },
    {
      id: 18,
      topic: 'Лидерство и влияние',
      question: 'Какие три составляющие входят в грамотное делегирование задач и развитие команды?',
      options: [
        '1. Определение задач по возможностям → 2. Предоставление ресурсов → 3. Обучение и развитие',
        '1. Сброс задач без объяснений → 2. Запрет на вопросы → 3. Штраф за просрочку',
        '1. Обещание сделать самому → 2. Забывание о задаче',
        '1. Передача только технической рутины без предоставления информации'
      ],
      correct: 0,
      explanation: 'Презентация 3, слайд 7: делегирование: 1. Определение задач исходя из возможностей, 2. Предоставление ресурсов и поддержки, 3. Обучение и развитие.'
    },

    // --- TOPIC 4: КОМПЕТЕНЦИИ И МОДЕЛЬ 4К ---
    {
      id: 19,
      topic: 'Компетенции и Модель 4К',
      question: 'К какому выводу пришли ученые Стэнфорда, Гарварда и Фонда Карнеги относительно факторов карьерного успеха?',
      options: [
        'Успех на 85% зависит от гибких навыков (Soft Skills) и только на 15% — от профессиональных (Hard Skills)',
        'Успех на 100% зависит от узких технических навыков (Hard Skills)',
        'Гибкие навыки важны только в сфере продаж и не нужны инженерам и юристам',
        'Профессиональный успех зависит исключительно от случайного везения'
      ],
      correct: 0,
      explanation: 'Презентация 4, слайд 7: исследования Стэнфорда, Гарварда и Карнеги установили, что успех на 85% зависит от гибких навыков и только на 15% — от профессиональных.'
    },
    {
      id: 20,
      topic: 'Компетенции и Модель 4К',
      question: 'Какие 4 ключевые компетенции входят в модель «4К» (гибкие навыки будущего)?',
      options: [
        'Креативность, Критическое мышление, Коммуникация, Кооперативность (командная работа)',
        'Компьютерная грамотность, Карьера, Контроль, Качество',
        'Красноречие, Командование, Конкуренция, Капитал',
        'Кодирование, Кибербезопасность, Консалтинг, Копирайтинг'
      ],
      correct: 0,
      explanation: 'Презентация 4, слайд 11: Модель 4К включает: Креативность, Критическое мышление, Коммуникация, Кооперативность (командная работа).'
    },
    {
      id: 21,
      topic: 'Компетенции и Модель 4К',
      question: 'Как в модели 4К определяется навык «Критическое мышление»?',
      options: [
        'Навык всестороннего анализа информации, позволяющий ставить под сомнение факты, делать обоснованные выводы и принимать взвешенные решения',
        'Постоянная придирчивость и критика чужих идей без предложения альтернатив',
        'Быстрое чтение текстов без осмысления их содержания',
        'Умение спорить с преподавателем ради демонстрации своей правоты'
      ],
      correct: 0,
      explanation: 'Презентация 4, слайд 15: критическое мышление — навык анализа информации, сомнения в фактах, обоснованных выводов и взвешенных решений.'
    },
    {
      id: 22,
      topic: 'Компетенции и Модель 4К',
      question: 'Что такое «Кооперативность» (командная работа) согласно концепции 4К?',
      options: [
        'Согласованная деятельность группы людей, объединенных общей целью, где каждый вносит свой вклад и несет ответственность за общий результат',
        'Создание коммерческой организации по оптовой торговле',
        'Подчинение всех участников единому мнению без возможности высказаться',
        'Индивидуальная работа, где каждый отвечает только за свой узкий участок и не общается с другими'
      ],
      correct: 0,
      explanation: 'Презентация 4, слайд 13: кооперативность — согласованная деятельность группы ради общей цели с взаимной ответственностью.'
    },
    {
      id: 23,
      topic: 'Компетенции и Модель 4К',
      question: 'Что находится в самом центре концепции «Треугольник развития» вокруг Личности, Hard-skills и Soft-skills?',
      options: [
        'Мотивация к развитию',
        'Размер заработной платы',
        'Принуждение со стороны руководства',
        'Уровень стресса на рабочем месте'
      ],
      correct: 0,
      explanation: 'Презентация 4, слайд 17: в центре «Треугольника развития» (между Личностью, Hard-skills и Soft-skills) находится «Мотивация к развитию».'
    },
    {
      id: 24,
      topic: 'Компетенции и Модель 4К',
      question: 'На какие 4 основные группы классифицируются гибкие навыки по видам деятельности?',
      options: [
        'Коммуникативные, интеллектуальные, волевые, лидерские',
        'Простые, средние, повышенные и высшие',
        'Устные, письменные, графические и цифровые',
        'Инженерные, гуманитарные, естественнонаучные и спортивные'
      ],
      correct: 0,
      explanation: 'Презентация 4, слайд 8: 4 вида гибких навыков: коммуникативные, интеллектуальные, волевые и лидерские.'
    }
  ];

  // --- STATE ---
  const TEST_DURATION_SECONDS = 15 * 60; // 15 minutes = 900s
  const MAX_VIOLATIONS = 3;

  const state = {
    student: {
      lastname: '',
      firstname: '',
      group: '',
      specialty: ''
    },
    isTestActive: false,
    isFinished: false,
    startTime: null,
    endTime: null,
    secondsLeft: TEST_DURATION_SECONDS,
    timerInterval: null,
    currentQuestionIndex: 0,
    answers: {}, // questionId -> selectedOptionIndex
    violationsCount: 0,
    violationsLog: [],
    score: 0,
    grade: 2,
    gradeText: 'Не сдано',
    disqualified: false
  };

  // Helper: DOM Element Selectors
  const screens = {
    reg: document.getElementById('screen-registration'),
    quiz: document.getElementById('screen-quiz'),
    results: document.getElementById('screen-results')
  };

  const inputs = {
    lastname: document.getElementById('student-lastname'),
    firstname: document.getElementById('student-firstname'),
    group: document.getElementById('student-group'),
    specialty: document.getElementById('student-specialty')
  };

  const bar = {
    student: document.getElementById('bar-student-info'),
    progressText: document.getElementById('bar-progress-text'),
    progressBar: document.getElementById('bar-progress-bar'),
    violations: document.getElementById('bar-violations'),
    timer: document.getElementById('bar-timer')
  };

  const quiz = {
    topicTag: document.getElementById('quiz-topic-tag'),
    counter: document.getElementById('quiz-counter-badge'),
    text: document.getElementById('quiz-question-title'),
    optionsContainer: document.getElementById('quiz-options-container'),
    btnPrev: document.getElementById('btn-prev-question'),
    btnNext: document.getElementById('btn-next-question'),
    btnFinish: document.getElementById('btn-finish-quiz'),
    mapGrid: document.getElementById('quiz-map-grid')
  };

  const modals = {
    anticheat: document.getElementById('anticheat-modal'),
    anticheatMsg: document.getElementById('anticheat-msg'),
    anticheatCount: document.getElementById('anticheat-count-text'),
    btnAnticheatAck: document.getElementById('btn-anticheat-ack'),

    confirm: document.getElementById('confirm-finish-modal'),
    confirmMsg: document.getElementById('confirm-finish-msg'),
    btnCancelFinish: document.getElementById('btn-cancel-finish'),
    btnProceedFinish: document.getElementById('btn-proceed-finish'),

    ios: document.getElementById('cert-ios-modal'),
    iosImg: document.getElementById('cert-ios-img'),
    btnIosShare: document.getElementById('btn-cert-ios-share'),
    btnCloseIos: document.getElementById('btn-close-cert-ios')
  };

  const toastEl = document.getElementById('toast');

  function showToast(msg, duration = 3000) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.remove('hidden');
    setTimeout(() => {
      toastEl.classList.add('hidden');
    }, duration);
  }

  // --- INITIALIZATION ---
  document.addEventListener('DOMContentLoaded', () => {
    initEvents();
  });

  function initEvents() {
    // 1. Start test button
    const btnStart = document.getElementById('btn-start-test');
    if (btnStart) {
      btnStart.addEventListener('click', handleStartTest);
    }

    // 2. Navigation buttons
    if (quiz.btnPrev) {
      quiz.btnPrev.addEventListener('click', () => {
        if (state.currentQuestionIndex > 0) {
          state.currentQuestionIndex--;
          renderCurrentQuestion();
        }
      });
    }

    if (quiz.btnNext) {
      quiz.btnNext.addEventListener('click', () => {
        if (state.currentQuestionIndex < QUESTIONS_DATA.length - 1) {
          state.currentQuestionIndex++;
          renderCurrentQuestion();
        }
      });
    }

    if (quiz.btnFinish) {
      quiz.btnFinish.addEventListener('click', handlePromptFinish);
    }

    // 3. Confirm finish modal buttons
    if (modals.btnCancelFinish) {
      modals.btnCancelFinish.addEventListener('click', () => {
        modals.confirm.classList.add('hidden');
      });
    }

    if (modals.btnProceedFinish) {
      modals.btnProceedFinish.addEventListener('click', () => {
        modals.confirm.classList.add('hidden');
        finishTest(false, 'Завершено студентом');
      });
    }

    // 4. Anti-cheat modal acknowledge button
    if (modals.btnAnticheatAck) {
      modals.btnAnticheatAck.addEventListener('click', () => {
        modals.anticheat.classList.add('hidden');
        if (state.disqualified) {
          finishTest(true, 'Дисквалификация: превышен лимит нарушений правил (уход с вкладки)');
        }
      });
    }

    // 5. Results actions
    const btnDownloadCert = document.getElementById('btn-download-cert-jpg');
    if (btnDownloadCert) {
      btnDownloadCert.addEventListener('click', handleDownloadCertJpg);
    }

    const btnPrint = document.getElementById('btn-print-cert');
    if (btnPrint) {
      btnPrint.addEventListener('click', () => {
        window.print();
      });
    }

    const btnRetake = document.getElementById('btn-retake-test');
    if (btnRetake) {
      btnRetake.addEventListener('click', handleRetakeTest);
    }

    // 6. iOS modal buttons
    if (modals.btnCloseIos) {
      modals.btnCloseIos.addEventListener('click', () => {
        modals.ios.classList.add('hidden');
      });
    }

    // 7. Prevent copy / cut / right-click during test
    document.addEventListener('copy', (e) => {
      if (state.isTestActive) {
        e.preventDefault();
        showToast('⚠️ Копирование материалов теста запрещено правилами!');
      }
    });

    document.addEventListener('contextmenu', (e) => {
      if (state.isTestActive) {
        e.preventDefault();
      }
    });

    // 8. Prevent accidental page refresh / back navigation
    window.addEventListener('beforeunload', (e) => {
      if (state.isTestActive && !state.isFinished) {
        e.preventDefault();
        e.returnValue = 'Тестирование не завершено. При выходе ваши результаты будут аннулированы!';
      }
    });

    // 9. STRICT ANTI-CHEAT: Visibility & Tab Switch Detection
    document.addEventListener('visibilitychange', () => {
      if (state.isTestActive && !state.isFinished) {
        if (document.visibilityState === 'hidden') {
          handleTabSwitchViolation('Сворачивание окна или переключение вкладки (visibilitychange)');
        }
      }
    });

    window.addEventListener('blur', () => {
      if (state.isTestActive && !state.isFinished) {
        // Give small debounce to avoid dual-triggering if visibilitychange fired simultaneously
        setTimeout(() => {
          if (document.visibilityState === 'hidden') {
            // Already handled by visibilitychange
            return;
          }
          handleTabSwitchViolation('Потеря фокуса браузера (window.onblur)');
        }, 150);
      }
    });
  }

  // --- START TEST HANDLER ---
  function handleStartTest() {
    const lastname = inputs.lastname.value.trim();
    const firstname = inputs.firstname.value.trim();
    const group = inputs.group.value.trim();
    const specialty = inputs.specialty.value.trim();

    if (!lastname || !firstname || !group) {
      alert('Пожалуйста, обязательно укажите вашу Фамилию, Имя и Учебную группу перед началом теста!');
      if (!lastname) inputs.lastname.focus();
      else if (!firstname) inputs.firstname.focus();
      else inputs.group.focus();
      return;
    }

    state.student.lastname = lastname;
    state.student.firstname = firstname;
    state.student.group = group;
    state.student.specialty = specialty || 'Не указана';

    state.isTestActive = true;
    state.isFinished = false;
    state.startTime = new Date();
    state.secondsLeft = TEST_DURATION_SECONDS;
    state.violationsCount = 0;
    state.violationsLog = [];
    state.answers = {};
    state.currentQuestionIndex = 0;
    state.disqualified = false;

    // Switch screen
    screens.reg.classList.add('hidden');
    screens.quiz.classList.remove('hidden');
    screens.results.classList.add('hidden');

    // Update sticky bar info
    const initials = `${lastname} ${firstname[0]}.`;
    bar.student.textContent = `${initials} (${group})`;
    updateViolationBadge();

    // Start timer
    startTimer();

    // Render questions map and active question
    renderQuestionMap();
    renderCurrentQuestion();

    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('🚀 Тест начался! У вас 15 минут. Переходить на другие вкладки запрещено.');
  }

  // --- TIMER ENGINE ---
  function startTimer() {
    if (state.timerInterval) clearInterval(state.timerInterval);
    updateTimerDisplay();

    state.timerInterval = setInterval(() => {
      state.secondsLeft--;
      updateTimerDisplay();

      if (state.secondsLeft <= 0) {
        clearInterval(state.timerInterval);
        finishTest(false, 'Время вышло (15 минут)');
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const mins = Math.floor(state.secondsLeft / 60);
    const secs = state.secondsLeft % 60;
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    bar.timer.textContent = `⏱ ${formatted}`;

    if (state.secondsLeft <= 60) {
      bar.timer.className = 'timer-pill danger';
    } else if (state.secondsLeft <= 180) {
      bar.timer.className = 'timer-pill warning';
    } else {
      bar.timer.className = 'timer-pill';
    }
  }

  // --- ANTI-CHEAT ENGINE ---
  let violationDebounce = false;

  function handleTabSwitchViolation(reason) {
    if (violationDebounce || !state.isTestActive || state.isFinished) return;
    violationDebounce = true;
    setTimeout(() => { violationDebounce = false; }, 1000);

    state.violationsCount++;
    const timeStamp = new Date().toLocaleTimeString('ru-RU');
    state.violationsLog.push({ count: state.violationsCount, time: timeStamp, reason });

    updateViolationBadge();

    if (state.violationsCount >= MAX_VIOLATIONS) {
      state.disqualified = true;
      modals.anticheatMsg.textContent = 'Вы превысили лимит допустимых нарушений (3 из 3). Тестирование принудительно остановлено. В протокол внесен факт дисквалификации за списывание и уход с вкладки.';
      modals.anticheatCount.textContent = `🚨 Нарушений: ${state.violationsCount} из ${MAX_VIOLATIONS} (Тест аннулирован)`;
      modals.btnAnticheatAck.textContent = 'Перейти к протоколу';
      modals.anticheat.classList.remove('hidden');
    } else {
      const remaining = MAX_VIOLATIONS - state.violationsCount;
      modals.anticheatMsg.textContent = `Внимание! Зафиксирован уход с вкладки или сворачивание окна. Переходить на другие вкладки во время тестирования СТРОГО ЗАПРЕЩЕНО! Осталось предупреждений до аннулирования теста: ${remaining}.`;
      modals.anticheatCount.textContent = `⚠️ Предупреждение ${state.violationsCount} из ${MAX_VIOLATIONS}`;
      modals.btnAnticheatAck.textContent = 'Я понял, вернуться к тесту';
      modals.anticheat.classList.remove('hidden');
    }
  }

  function updateViolationBadge() {
    if (state.violationsCount === 0) {
      bar.violations.className = 'violation-badge ok';
      bar.violations.textContent = 'Нарушений: 0 / 3';
    } else if (state.violationsCount === 1) {
      bar.violations.className = 'violation-badge warn';
      bar.violations.textContent = 'Нарушений: 1 / 3 ⚠️';
    } else {
      bar.violations.className = 'violation-badge danger';
      bar.violations.textContent = `Нарушений: ${state.violationsCount} / 3 🚨`;
    }
  }

  // --- RENDER CURRENT QUESTION ---
  function renderCurrentQuestion() {
    const q = QUESTIONS_DATA[state.currentQuestionIndex];
    if (!q) return;

    // Metadata
    quiz.topicTag.textContent = q.topic;
    quiz.counter.textContent = `Вопрос ${state.currentQuestionIndex + 1} из ${QUESTIONS_DATA.length}`;
    bar.progressText.textContent = `Вопрос ${state.currentQuestionIndex + 1} из ${QUESTIONS_DATA.length}`;

    // Progress bar
    const progressPercent = Math.round(((state.currentQuestionIndex + 1) / QUESTIONS_DATA.length) * 100);
    bar.progressBar.style.width = `${progressPercent}%`;

    // Question Text
    quiz.text.textContent = q.question;

    // Options
    const letters = ['A', 'Б', 'В', 'Г'];
    quiz.optionsContainer.innerHTML = q.options.map((optText, optIndex) => {
      const isSelected = state.answers[q.id] === optIndex;
      return `
        <div class="option-item ${isSelected ? 'selected' : ''}" data-index="${optIndex}">
          <span class="option-letter">${letters[optIndex]}</span>
          <span class="option-text">${escapeHtml(optText)}</span>
        </div>
      `;
    }).join('');

    // Bind option click
    quiz.optionsContainer.querySelectorAll('.option-item').forEach(el => {
      el.addEventListener('click', () => {
        const index = parseInt(el.getAttribute('data-index'), 10);
        state.answers[q.id] = index;

        // Visual selection
        quiz.optionsContainer.querySelectorAll('.option-item').forEach(i => i.classList.remove('selected'));
        el.classList.add('selected');

        // Update map button
        updateQuestionMap();
      });
    });

    // Nav buttons state
    quiz.btnPrev.disabled = (state.currentQuestionIndex === 0);

    if (state.currentQuestionIndex === QUESTIONS_DATA.length - 1) {
      quiz.btnNext.classList.add('hidden');
    } else {
      quiz.btnNext.classList.remove('hidden');
    }

    updateQuestionMap();
  }

  // --- QUESTION MAP (PALITRA) ---
  function renderQuestionMap() {
    quiz.mapGrid.innerHTML = QUESTIONS_DATA.map((q, idx) => {
      return `
        <button type="button" class="q-map-btn" data-index="${idx}" title="Вопрос #${idx + 1}">
          ${idx + 1}
        </button>
      `;
    }).join('');

    quiz.mapGrid.querySelectorAll('.q-map-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        state.currentQuestionIndex = idx;
        renderCurrentQuestion();
      });
    });
  }

  function updateQuestionMap() {
    const buttons = quiz.mapGrid.querySelectorAll('.q-map-btn');
    buttons.forEach((btn, idx) => {
      const q = QUESTIONS_DATA[idx];
      const isAnswered = state.answers[q.id] !== undefined;
      const isCurrent = (state.currentQuestionIndex === idx);

      btn.className = 'q-map-btn';
      if (isAnswered) btn.classList.add('answered');
      if (isCurrent) btn.classList.add('current');
    });
  }

  // --- FINISH TEST PROMPT ---
  function handlePromptFinish() {
    const answeredCount = Object.keys(state.answers).length;
    const totalCount = QUESTIONS_DATA.length;
    const remaining = totalCount - answeredCount;

    if (remaining > 0) {
      modals.confirmMsg.textContent = `Внимание! Вы ответили на ${answeredCount} из ${totalCount} вопросов (осталось неотвеченных: ${remaining}). Неотвеченные вопросы будут засчитаны как ошибки. Вы уверены, что хотите завершить тестирование?`;
    } else {
      modals.confirmMsg.textContent = `Вы ответили на все ${totalCount} вопросов! Завершить тестирование и сформировать официальный протокол результатов?`;
    }

    modals.confirm.classList.remove('hidden');
  }

  // --- FINISH TEST & SCORE CALCULATION ---
  function finishTest(isForced = false, reason = '') {
    if (state.timerInterval) clearInterval(state.timerInterval);
    state.isTestActive = false;
    state.isFinished = true;
    state.endTime = new Date();

    // Calculate score
    let correctCount = 0;
    const topicStats = {
      'Командная работа': { total: 0, correct: 0 },
      'Резюме и самопрезентация': { total: 0, correct: 0 },
      'Лидерство и влияние': { total: 0, correct: 0 },
      'Компетенции и Модель 4К': { total: 0, correct: 0 }
    };

    QUESTIONS_DATA.forEach(q => {
      if (topicStats[q.topic]) {
        topicStats[q.topic].total++;
      }
      const userAns = state.answers[q.id];
      if (userAns !== undefined && userAns === q.correct) {
        correctCount++;
        if (topicStats[q.topic]) topicStats[q.topic].correct++;
      }
    });

    state.score = correctCount;
    const percent = Math.round((correctCount / QUESTIONS_DATA.length) * 100);

    // Grade calculation (Russian 5-point scale)
    if (state.disqualified) {
      state.grade = 2;
      state.gradeText = 'Аннулировано (2)';
    } else if (percent >= 85) {
      state.grade = 5;
      state.gradeText = 'Отлично (5)';
    } else if (percent >= 70) {
      state.grade = 4;
      state.gradeText = 'Хорошо (4)';
    } else if (percent >= 55) {
      state.grade = 3;
      state.gradeText = 'Удовлетворительно (3)';
    } else {
      state.grade = 2;
      state.gradeText = 'Не сдано (2)';
    }

    // Render results view
    renderResultsView(topicStats, percent, isForced, reason);

    // Switch screen
    screens.quiz.classList.add('hidden');
    screens.results.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    showToast('🏁 Тестирование завершено! Протокол сформирован.');
  }

  // --- RENDER RESULTS VIEW ---
  function renderResultsView(topicStats, percent, isForced, reason) {
    // 1. Student metadata
    document.getElementById('cert-student-name').textContent = `${state.student.lastname} ${state.student.firstname}`;
    document.getElementById('cert-student-group').textContent = state.student.group;
    document.getElementById('cert-student-specialty').textContent = state.student.specialty;

    // Time formatting
    const elapsedSecs = Math.max(0, TEST_DURATION_SECONDS - state.secondsLeft);
    const eMin = Math.floor(elapsedSecs / 60);
    const eSec = elapsedSecs % 60;
    const timeStr = `${String(eMin).padStart(2, '0')}:${String(eSec).padStart(2, '0')}`;
    document.getElementById('cert-time-spent').textContent = `${timeStr} (из 15:00)`;

    // Date
    const now = new Date();
    document.getElementById('cert-date').textContent = now.toLocaleString('ru-RU', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    // Anti-cheat status
    const certAntiCheat = document.getElementById('cert-anticheat-status');
    if (state.disqualified) {
      certAntiCheat.innerHTML = `<span style="color: #b91c1c; font-weight: 800;">⛔ Дисквалификация (${state.violationsCount} нарушений)</span>`;
    } else if (state.violationsCount === 0) {
      certAntiCheat.innerHTML = `<span style="color: #166534; font-weight: 700;">✓ Соблюдено (0 нарушений)</span>`;
    } else {
      certAntiCheat.innerHTML = `<span style="color: #b45309; font-weight: 700;">⚠️ Зафиксировано нарушений: ${state.violationsCount}</span>`;
    }

    // 2. Score Banner
    const scoreGrid = document.getElementById('cert-score-banner');
    scoreGrid.className = `cert-score-grid grade-${state.grade}`;

    document.getElementById('cert-grade-num').textContent = state.grade;
    document.getElementById('cert-grade-text').textContent = state.gradeText;
    document.getElementById('cert-score-points').textContent = `${state.score} из ${QUESTIONS_DATA.length}`;
    document.getElementById('cert-score-percent').textContent = `${percent}%`;

    // 3. Topic progress bars
    const topicContainer = document.getElementById('cert-topics-list');
    topicContainer.innerHTML = Object.keys(topicStats).map(topic => {
      const st = topicStats[topic];
      const p = st.total > 0 ? Math.round((st.correct / st.total) * 100) : 0;
      return `
        <div class="topic-breakdown-row">
          <div class="topic-info-line">
            <span>${escapeHtml(topic)}</span>
            <span>${st.correct} / ${st.total} (${p}%)</span>
          </div>
          <div class="topic-track">
            <div class="topic-fill" style="width: ${p}%;"></div>
          </div>
        </div>
      `;
    }).join('');

    // 4. Detailed answers breakdown
    const reviewList = document.getElementById('review-questions-list');
    const letters = ['A', 'Б', 'В', 'Г'];

    reviewList.innerHTML = QUESTIONS_DATA.map((q, idx) => {
      const userAns = state.answers[q.id];
      const isCorrect = (userAns !== undefined && userAns === q.correct);
      const isUnanswered = (userAns === undefined);

      let statusBadge = '';
      if (isCorrect) {
        statusBadge = '<span class="review-status-pill correct">✓ Верно (+1 балл)</span>';
      } else if (isUnanswered) {
        statusBadge = '<span class="review-status-pill incorrect">✗ Без ответа (0 баллов)</span>';
      } else {
        statusBadge = '<span class="review-status-pill incorrect">✗ Ошибка (0 баллов)</span>';
      }

      const userAnsText = isUnanswered ? '— Не отвечено' : `${letters[userAns]}) ${q.options[userAns]}`;
      const correctAnsText = `${letters[q.correct]}) ${q.options[q.correct]}`;

      return `
        <div class="review-item-card ${isCorrect ? 'correct' : 'incorrect'}">
          <div class="review-item-header">
            <span class="topic-tag">${escapeHtml(q.topic)}</span>
            ${statusBadge}
          </div>
          <div class="review-question-text">${idx + 1}. ${escapeHtml(q.question)}</div>
          
          <div class="review-answer-line user-answer">
            <strong>Ваш ответ:</strong> ${escapeHtml(userAnsText)}
          </div>
          ${!isCorrect ? `
            <div class="review-answer-line correct-answer">
              <strong>Правильный ответ:</strong> ${escapeHtml(correctAnsText)}
            </div>
          ` : ''}
          <div class="review-explanation">
            💡 <em>Пояснение:</em> ${escapeHtml(q.explanation)}
          </div>
        </div>
      `;
    }).join('');
  }

  // --- RETAKE TEST ---
  function handleRetakeTest() {
    if (confirm('Вы уверены, что хотите пройти тестирование заново? Текущий результат будет сброшен.')) {
      screens.results.classList.add('hidden');
      screens.quiz.classList.add('hidden');
      screens.reg.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // --- CERTIFICATE JPG EXPORT ENGINE ---
  let certBlobUrl = null;
  let certFile = null;
  let certFilename = 'Протокол_Тестирования.jpg';

  function isIOSDevice() {
    return (
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    );
  }

  async function handleDownloadCertJpg() {
    if (typeof html2canvas === 'undefined') {
      alert('Ошибка: библиотека html2canvas не загружена.');
      return;
    }

    showToast('⏳ Формируем карточку протокола в высоком разрешении...');

    try {
      const target = document.getElementById('certificate-card-target');

      const canvas = await html2canvas(target, {
        scale: 2.2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        onclone: (clonedDoc) => {
          const clonedTarget = clonedDoc.getElementById('certificate-card-target');
          if (clonedTarget) {
            clonedTarget.style.boxShadow = 'none';
            clonedTarget.style.maxWidth = '760px';
          }
        }
      });

      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.95));

      if (certBlobUrl) URL.revokeObjectURL(certBlobUrl);
      certBlobUrl = URL.createObjectURL(blob);

      const cleanLast = (state.student.lastname || 'Студент').replace(/[^a-zA-Zа-яА-Я0-9_-]/g, '_');
      const cleanGroup = (state.student.group || 'Группа').replace(/[^a-zA-Zа-яА-Я0-9_-]/g, '_');
      certFilename = `Протокол_Тест_${cleanLast}_${cleanGroup}.jpg`;

      try {
        certFile = new File([blob], certFilename, { type: 'image/jpeg' });
      } catch (e) {
        certFile = blob;
      }

      if (isIOSDevice()) {
        openCertIosModal();
      } else {
        // Direct download for PC / Android
        const link = document.createElement('a');
        link.href = certBlobUrl;
        link.download = certFilename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast('🎉 Протокол успешно сохранен в JPG!');
      }
    } catch (err) {
      console.error('Ошибка экспорта протокола:', err);
      alert('Не удалось сформировать JPG. Воспользуйтесь кнопкой «Печать» для сохранения в PDF.');
    }
  }

  function openCertIosModal() {
    if (!modals.ios) return;
    if (modals.iosImg && certBlobUrl) {
      modals.iosImg.src = certBlobUrl;
    }
    modals.ios.classList.remove('hidden');

    if (modals.btnIosShare) {
      modals.btnIosShare.onclick = async () => {
        if (navigator.canShare && certFile) {
          try {
            if (navigator.canShare({ files: [certFile] })) {
              await navigator.share({
                files: [certFile],
                title: certFilename
              });
              showToast('✓ Протокол сохранен!');
              return;
            }
          } catch (err) {
            if (err.name === 'AbortError') return;
          }
        }
        if (certBlobUrl) {
          window.open(certBlobUrl, '_blank');
          showToast('Зажмите картинку и выберите «Сохранить в Фото»');
        }
      };
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

})();
