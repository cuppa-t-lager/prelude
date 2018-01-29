;; Creating a new menu pane in the menu bar to the right of Tools menu
(define-key-after
		global-map
		[menu-bar    mymenu]
		(cons        "John's Menu" (make-sparse-keymap "hoot hoot"))
		'tools       )
(define-key          global-map [menu-bar mymenu crux             ]  '("CRUX"))
(define-key          global-map [menu-bar mymenu helm             ]  '("HELM"))
(define-key          global-map [menu-bar mymenu delete           ]  '("DELETE"))
(define-key          global-map [menu-bar mymenu navigation       ]  '("NAVIGATION"))
(define-key          global-map [menu-bar mymenu indent           ]  '("INDENTATION"))
(define-key          global-map [menu-bar mymenu cursors          ]  '("CURSORS"))
(define-key          global-map [menu-bar mymenu bookmarks        ]  '("BOOKMARKS"))
(define-key          global-map [menu-bar mymenu rectangle        ]  '("RECTANGLE"))
(define-key          global-map [menu-bar mymenu buffer           ]  '("BUFFER"))
(define-key          global-map [menu-bar mymenu string           ]  '("STRING"))


(define-key-after
	global-map
	[menu-bar        mymenu crux]
	(cons            "crux" (make-sparse-keymap "hoot hoot"))
	'tools           )
(define-key          global-map [menu-bar mymenu crux criff       ]  '("crux-recentf-ido-find-file"                  . crux-recentf-ido-find-file))
(define-key          global-map [menu-bar mymenu crux ctjl        ]  '("crux-top-join-line"                          . crux-top-join-line))
(define-key          global-map [menu-bar mymenu crux ckwl        ]  '("crux-kill-whole-line"                        . crux-kill-whole-line))
(define-key          global-map [menu-bar mymenu crux cdcl        ]  '("crux-duplicate-current-line-or-region"       . crux-duplicate-current-line-or-region))
(define-key          global-map [menu-bar mymenu crux ctw         ]  '("crux-transpose-windows"                      . crux-transpose-windows))
(define-key          global-map [menu-bar mymenu crux ckob        ]  '("crux-kill-other-buffers"                     . crux-kill-other-buffers))
(define-key          global-map [menu-bar mymenu crux cid         ]  '("crux-indent-defun"                           . crux-indent-defun))
(define-key          global-map [menu-bar mymenu crux cklb        ]  '("crux-kill-line-backwards"                    . crux-kill-line-backwards))
(define-key          global-map [menu-bar mymenu crux ctjl        ]  '("crux-top-join-lines"                         . crux-top-join-lines))
(define-key          global-map [menu-bar mymenu crux cklb        ]  '("crux-kill-line-backwards"                    . crux-kill-line-backwards))

(define-key-after
	global-map
	[menu-bar        mymenu helm]
	(cons            "helm" (make-sparse-keymap "hoot hoot"))
	'tools           )
;; (define-key          global-map [menu-bar mymenu helm hi          ]  '("helm-imenu"                                  . helm-imenu))
(define-key          global-map [menu-bar mymenu helm hl          ]  '("helm-locate"                                 . helm-locate))
(define-key          global-map [menu-bar mymenu helm hpag        ]  '("helm-projectile-ag"                          . helm-projectile-ag))
(define-key          global-map [menu-bar mymenu helm hpg         ]  '("helm-projectile-grep"                        . helm-projectile-grep))
(define-key          global-map [menu-bar mymenu helm hpstb       ]  '("helm-projectile-switch-to-buffer"            . helm-projectile-switch-to-buffer))
(define-key          global-map [menu-bar mymenu helm hfd         ]  '("helm-projectile-find-dir"                    . helm-projectile-find-dir))
(define-key          global-map [menu-bar mymenu helm hpffd       ]  '("helm-projectile-find-file-dwim"              . helm-projectile-find-file-dwim))
(define-key          global-map [menu-bar mymenu helm hpffkp      ]  '("helm-projectile-find-file-in-known-projects" . helm-projectile-find-file-in-known-projects))
(define-key          global-map [menu-bar mymenu helm hpfof       ]  '("helm-projectile-find-other-file"             . helm-projectile-find-other-file))
(define-key          global-map [menu-bar mymenu helm hpff        ]  '("helm-projectile-find-file"                   . helm-projectile-find-file))
(define-key          global-map [menu-bar mymenu helm hprf        ]  '("helm-projectile-recentf"                     . helm-projectile-recentf))
(define-key          global-map [menu-bar mymenu helm hprg        ]  '("helm-projectile-rg"                          . helm-projectile-rg))
(define-key          global-map [menu-bar mymenu helm hprgap      ]  '("helm-projectile-rg-at-point"                 . helm-projectile-rg-at-point))
(define-key          global-map [menu-bar mymenu helm hrf         ]  '("helm-recentf"                                . helm-recentf))
(define-key          global-map [menu-bar mymenu helm hr          ]  '("helm-resume"                                 . helm-resume))
;;(define-key          global-map [menu-bar mymenu helm hrg         ]  '("helm-rg"                                     . helm-rg))
;;(define-key          global-map [menu-bar mymenu helm hrgap       ]  '("helm-rg-at-point"                            . helm-rg-at-point))


(define-key-after
		global-map
		[menu-bar    mymenu delete]
		(cons        "delete" (make-sparse-keymap "hoot hoot"))
		'tools       )
(define-key          global-map [menu-bar mymenu delete ztc       ]  '("zop-to-char"                                 . zop-to-char))
(define-key          global-map [menu-bar mymenu delete chdb      ]  '("c-hungry-delete-backwards"                   . c-hungry-delete-backwards))
(define-key          global-map [menu-bar mymenu delete chdf      ]  '("c-hungry-delete-forwards"                    . c-hungry-delete-forward))
(define-key          global-map [menu-bar mymenu delete wws       ]  '("whack-whitespace"                            . whack-whitespace))
(define-key          global-map [menu-bar mymenu delete dhs       ]  '("delete-horizontal-space"                     . delete-horizontal-space))
(define-key          global-map [menu-bar mymenu delete j1s       ]  '("just-one-space"                              . just-one-space))
(define-key          global-map [menu-bar mymenu delete ww        ]  '("whack-whitespace"                            . whack-whitespace))

(define-key-after
	global-map
	[menu-bar        mymenu navigation]
	(cons            "navigation" (make-sparse-keymap "hoot hoot"))
	'tools           )
(define-key          global-map [menu-bar mymenu navigation sstf  ]  '("sgml-skip-tag-forward <M-right>"             . sgml-skip-tag-forward))
(define-key          global-map [menu-bar mymenu navigation sstb  ]  '("sgml-skip-tag-backward <M-left>"             . sgml-skip-tag-backward))
(define-key          global-map [menu-bar mymenu navigation pgm   ]  '("pop-global-mark C-x C-SPC"                   . pop-global-mark))
(define-key          global-map [menu-bar mymenu navigation agc   ]  '("avy-goto-char"                               . avy-goto-char))
(define-key          global-map [menu-bar mymenu navigation agc2  ]  '("avy-goto-char-2"                             . avy-goto-char-2))
(define-key          global-map [menu-bar mymenu navigation agl   ]  '("avy-goto-line"                               . avy-goto-line))
(define-key          global-map [menu-bar mymenu navigation agw1  ]  '("avy-goto-word-1"                             . avy-goto-word-1))
(define-key          global-map [menu-bar mymenu navigation agws1 ]  '("avy-goto-word-or-subword-1"                  . avy-goto-word-or-subword-1))


(define-key          global-map [menu-bar mymenu navigation lml   ]  '("list-matching-lines"                         . list-matching-lines))
(define-key          global-map [menu-bar mymenu navigation iygtcf]  '("iy-go-to-char-backward"                      . iy-go-to-char-backward))
(define-key          global-map [menu-bar mymenu navigation iygtc ]  '("iy-go-to-char"                               . iy-go-to-char))
(define-key          global-map [menu-bar mymenu navigation ffwsn ]  '("find-file-with-similar-name"                 . find-file-with-similar-name))
(define-key          global-map [menu-bar mymenu navigation ffip  ]  '("find-file-in-project"                        . find-file-in-project))
(define-key          global-map [menu-bar mymenu navigation ffap  ]  '("find-file-at-point"                          . ffap))
(define-key          global-map [menu-bar mymenu navigation ffir  ]  '("find-file-in-repository"                     . find-file-in-repository))
(define-key          global-map [menu-bar mymenu navigation ffipbs]  '("find-file-in-project-by-selected"            . find-file-in-project-by-selected))
(define-key          global-map [menu-bar mymenu navigation dgj   ]  '("dumb-jump-go (H-s-g)"                      . 'dumb-jump-go))
(define-key          global-map [menu-bar mymenu navigation djb   ]  '("dumb-jump-back (H-s-b)"                    . 'dumb-jump-back))
(define-key          global-map [menu-bar mymenu navigation djql  ]  '("dumb-jump-quick-look (H-s-q)"              . 'dumb-jump-quick-look))
(define-key          global-map [menu-bar mymenu navigation djgow ]  '("dumb-jump-go-other-window (H-s-o)"         . 'dumb-jump-go-other-window))

(define-key-after
	global-map
	[menu-bar        mymenu indent]
	(cons            "indent" (make-sparse-keymap "hoot hoot"))
	'tools           )
(define-key          global-map [menu-bar mymenu indent de        ]  '("dabbrev-expand"                              . dabbrev-expand))
(define-key          global-map [menu-bar mymenu indent irb       ]  '("indent-relative-below"                       . indent-relative-below))
(define-key          global-map [menu-bar mymenu indent ir        ]  '("indent-relative"                             . indent-relative))
(define-key          global-map [menu-bar mymenu indent icr       ]  '("indent-rigidly-right-to-tab-stop"            . indent-code-rigidlyp))

(define-key-after
	global-map
	[menu-bar        mymenu cursors]
	(cons            "cursors" (make-sparse-keymap "hoot hoot"))
	'tools           )
(define-key          global-map [menu-bar mymenu cursors mcel     ]  '("mc/edit-lines"                               . mc/edit-lines))
(define-key          global-map [menu-bar mymenu cursors mcmnlt   ]  '("mc/mark-next-like-this"                      . mc/mark-next-like-this))
(define-key          global-map [menu-bar mymenu cursors mcmplt   ]  '("mc/mark-previous-like-this"                  . mc/mark-previous-like-this))
(define-key          global-map [menu-bar mymenu cursors mcuplt   ]  '("mc/unmark-previous-like-this"                . mc/mark-previous-like-this))
(define-key          global-map [menu-bar mymenu cursors mcmalt   ]  '("mc/mark-all-like-this"                       . mc/mark-all-like-this))

(define-key-after
	global-map
	[menu-bar        mymenu bookmarks]
	(cons            "bookmarks" (make-sparse-keymap "hoot hoot"))
	'tools           )
(define-key          global-map [menu-bar mymenu bookmarks bj     ]  '("bookmark-jump"                               . bookmark-jump))
(define-key          global-map [menu-bar mymenu bookmarks bml    ]  '("bookmark-bmenu-list"                         . bookmark-bmenu-list))
(define-key          global-map [menu-bar mymenu bookmarks bs     ]  '("bookmark-set"                                . bookmark-set))






(define-key-after
	global-map
	[menu-bar        mymenu marking]
	(cons            "marking" (make-sparse-keymap "hoot hoot"))
	'tools           )
(define-key          global-map [menu-bar mymenu marking pgm      ]  '("pop-global-mark (C-x C-x)"                   . pop-global-mark))
(define-key          global-map [menu-bar mymenu marking epam     ]  '("exchange-point-and-mark"                     . exchange-point-and-mark))
(define-key          global-map [menu-bar mymenu marking pm       ]  '("pop-mark (C-u C-<SPC>)"                      . pop-mark))
(define-key          global-map [menu-bar mymenu marking bblf     ]  '("back-button-local-forward (C-x <right>)"     . back-button-local-forward))
(define-key          global-map [menu-bar mymenu marking bblb     ]  '("back-button-local-backward (C-x <left>)"     . back-button-local-backward))
(define-key          global-map [menu-bar mymenu marking bbg      ]  '("back-button-global (C-x <SPC>)"              . back-button-global))



(define-key-after
	global-map
	[menu-bar        mymenu rectangle]
	(cons            "rectangle" (make-sparse-keymap "hoot hoot"))
	'tools           )
(define-key          global-map [menu-bar mymenu rectangle rmm    ]  '("rectangle-mark-mode"                         . rectangle-mark-mode))
(define-key          global-map [menu-bar mymenu rectangle sr     ]  '("string-rectangle"                            . string-rectangle))
(define-key          global-map [menu-bar mymenu rectangle dr     ]  '("delete-rectangle"                            . delete-rectangle))
(define-key          global-map [menu-bar mymenu rectangle srra   ]  '("set-rectangular-region-anchor"                   . set-rectangular-region-anchor))

(define-key-after
	global-map
	[menu-bar        mymenu editing]
	(cons            "editing" (make-sparse-keymap "hoot hoot"))
	'tools           )
(define-key          global-map [menu-bar mymenu editing mtu      ]  '("move-text-up"                                . move-text-up))
(define-key          global-map [menu-bar mymenu editing mtd      ]  '("move-text-down"                              . move-text-down))

(define-key-after
	global-map
	[menu-bar        mymenu imenu]
	(cons            "imenu" (make-sparse-keymap "hoot hoot"))
	'tools           )
(define-key          global-map [menu-bar mymenu imenu ima        ]  '("imenu-anywhere"                              . imenu-anywhere))
(define-key          global-map [menu-bar mymenu imenu hsoi       ]  '("helm-semantic-or-imenu"                      . helm-semantic-or-imenu))
(define-key          global-map [menu-bar mymenu imenu iia        ]  '("ido-imenu-anywhere"                          . ido-imenu-anywhere))
(define-key          global-map [menu-bar mymenu imenu i          ]  '("imenu"                                       . imenu))

(define-key-after
  global-map
  [menu-bar        mymenu buffer]
  (cons            "buffer" (make-sparse-keymap "hoot hoot"))
  'tools           )
(define-key          global-map [menu-bar mymenu buffer asw       ]  '("ace-swap-window"                              . ace-swap-window))

(define-key-after
  global-map
  [menu-bar        mymenu string]
  (cons            "string" (make-sparse-keymap "hoot hoot"))
  'tools           )
(define-key          global-map [menu-bar mymenu string sikc      ]  '("string-inflection-kebab-case"                 . string-inflection-kebab-case))
(define-key          global-map [menu-bar mymenu string silc      ]  '("string-inflection-lower-camelcase"            . string-inflection-lower-camelcase))
