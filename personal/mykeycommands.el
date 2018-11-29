;;(global-unset-key (kbd "C-M-j"))
(global-unset-key (kbd "C-x C-s"))

(global-set-key (kbd "M-s-e")               'eval-buffer)                           ;;e

(global-set-key (kbd "<M-s-backspace>")     'c-hungry-delete-backwards)
(global-set-key (kbd "<H-M-s-backspace>")   'c-hungry-delete-forward)

(global-set-key (kbd "M-s->")               'scroll-left)
(global-set-key (kbd "M-s-<")               'scroll-right)

(global-set-key (kbd "M-s-a")               'ace-jump-mode)                          ;;a
(global-set-key (kbd "M-s-w")               'ace-jump-word-mode)                     ;;w
;;(global-set-key (kbd "M-s-")               'avy-goto-char)                         ;;:
(global-set-key (kbd "C-'")                 'avy-goto-char-2)                        ;;'
(global-set-key (kbd "M-g l")               'avy-goto-line)                          ;;
(global-set-key (kbd "M-g w")               'avy-goto-word-1)
(global-set-key (kbd "s-.")                 'avy-goto-word-or-subword-1)
(global-set-key (kbd "M-s-.")               'iy-go-to-char)                          ;;.
(global-set-key (kbd "M-s-,")               'iy-go-to-char-backward)                 ;;,

;;b(global-set-key (kbd "s-a w")            'ace-swap-window)

;;(global-set-key (kbd "C-u C-c SPC")       'ace-jump-char-mode)
;;(global-set-key (kbd "C-u C-u C-c SPC")   'ace-jump-char-mode)

(global-set-key (kbd "H-w")                 'whitespace-mode)
(global-set-key (kbd "H-s")                 'rgrep)
(global-set-key (kbd "H-t")                 'ansi-term)

(setq dabbrev-case-replace nil)
(global-set-key (kbd "M-/")                 'dabbrev-expand)                         ;;/

(global-set-key (kbd "s-]")                 'indent-relative)                        ;;]
(global-set-key (kbd "s-[")                 'indent-relative-below)                  ;;[
(global-set-key (kbd "RET")                 'newline-and-indent)
(global-set-key (kbd "<H-tab>")             'indent-code-rigidly)

(global-set-key (kbd "H-r")                 'recentf-open-files)
(global-set-key (kbd "H-SPC")               'set-rectangular-region-anchor)

;;(global-set-key (kbd "C-x b")             'helm-buffers-list)
(global-set-key (kbd "C-x b")               'helm-mini)
(global-set-key (kbd "C-x r b")             'helm-bookmarks)
(global-set-key (kbd "C-x r d")             'bookmark-delete)
(global-set-key (kbd "C-x m")               'helm-M-x)
(global-set-key (kbd "M-y")                 'helm-show-kill-ring)
(global-set-key (kbd "C-x C-f")             'helm-find-files)

(global-set-key (kbd "C-c h r")             'helm-rg)
(global-set-key (kbd "C-c h p")             'helm-rg-at-point)
(global-set-key (kbd "M-s-;")               'helm-projectile-rg)
(global-set-key (kbd "M-s-'")               'projectile-ripgrep)
(global-set-key (kbd "M-s-:")               'helm-projectile-rg-at-point)
(global-set-key (kbd "C-c h i")             'helm-imenu)
(global-set-key (kbd "M-s-y")               'helm-yas-complete)
(global-set-key (kbd "H-s-s")               'helm-multi-occur-as-action)



;;(global-set-key (kbd "M-s-g")             'dumb-jump-go)
;;(global-set-key (kbd "M-s-b")             'dumb-jump-back)
;;(global-set-key (kbd "M-s-q")             'dumb-jump-quick-look)
;;(global-set-key (kbd "M-s-o")             'dumb-jump-go-other-window)

(global-set-key (kbd "M-s-k")               'string-inflection-kebab-case)           ;;k
(global-set-key (kbd "M-s-c")               'string-inflection-lower-camelcase)      ;;c

(global-set-key (kbd "H-.")                 'delete-horizontal-space)



(global-set-key (kbd "M-s-!")               'projectile-find-file-dwim-other-window) ;;!


;; make some use of the Super key
(global-set-key (kbd "s-d")                 'projectile-find-dir)
(global-set-key (kbd "s-f")                 'projectile-find-file)
(global-set-key (kbd "s-g")                 'projectile-grep)
(global-set-key (kbd "s-j")                 'prelude-top-join-line)
(global-set-key (kbd "s-k")                 'prelude-kill-whole-line)
(global-set-key (kbd "s-l")                 'goto-line)
(global-set-key (kbd "s-m")                 'magit-status)
(global-set-key (kbd "s-o")					'prelude-open-line-above)
(global-set-key (kbd "s-o")					'prelude-open-line-above)
(global-set-key (kbd "s-w")					'delete-frame)
(global-set-key (kbd "s-x")           		'exchange-point-and-mark)
;;(global-set-key (kbd "s-p")             	'projectile-switch-project)

(global-set-key (kbd "s-x")             	'kill-regiont)
(global-set-key (kbd "s-c")             	'easy-kill)
(global-set-key (kbd "s-v")                 'yank)
(global-set-key (kbd "s-z")                 'undo-tree-undo)
(global-set-key (kbd "s-a")                 'mark-whole-buffer)
(global-set-key (kbd "s-s")                 'save-buffer)

(global-set-key (kbd "H-o")                 'mode-line-other-buffer)
(global-set-key (kbd "H-M-k")               'my-kill-other-buffers)
(global-set-key (kbd "C-s-w")               'my-toggle-maximize-buffer)

;(global-set-key (kbd "C-s-=")             '-1 er/expand-region)

;;(global-set-key (kbd "M-s-=")             'er/expand-region)                       ;;=
(global-set-key (kbd "C-M-=")               'er/contract-region)                     ;;-
(global-set-key (kbd "H-l")                 'locate)
(global-set-key (kbd "s-&")                 'kill-this-buffer)
(global-set-key (kbd "s-w")                 'kill-this-buffer)
(global-set-key (kbd "H-u")                 'my-untabify-buffer)
(global-set-key (kbd "H-t")                 'my-insert-leading-tabs)
(global-set-key (kbd "H-m")                 'my-clean-up-tabs)
(global-set-key (kbd "C-x C-e")             'eval-last-sexp)
(global-set-key (kbd "C-c <backspace>")     'crux-kill-line-backwards)
(global-set-key (kbd "C-x 4 t")             'crux-transpose-windows)
(global-set-key (kbd "M-s-r")               'find-file-in-repository)                ;;r
(global-set-key (kbd "M-s-p")               'find-file-in-project)                   ;;p
(global-set-key (kbd "M-s-s")               'find-file-in-project-by-selected)       ;;s
(global-set-key (kbd "M-s-f")               'ffap)                                   ;;f
;;(global-set-key (kbd "M-s-")               'find-file-with-similar-name)
(global-set-key (kbd "M-s-i")               'imenu) ;                                ;;i
;;(global-set-key (kbd "M-s-o")             'other-frame) ;                          ;;o

(global-set-key (kbd "H-/")                 'dabbrev-expand)
(global-set-key (kbd "H-i a")               'ido-imenu-anywhere)
(global-set-key (kbd "s-=")                 'text-scale-increase)
(global-set-key (kbd "s--")                 'text-scale-decrease)



;;(global-set-key (kbd "s-C-M RIGHT")       'forward-sentence)
;;(global-set-key (kbd "M-s-C LEFT")        'backwards-sentence)

(global-set-key (kbd "M-s-j")               'js2-mode)                               ;;j
(global-set-key (kbd "M-s-s")               'json-mode)                              ;;s
(global-set-key (kbd "M-s-h")               'html-mode)                              ;;h
(global-set-key (kbd "H-A")                 'angular-mode)

(global-set-key (kbd "C-&")                 'my-replace-symbols-with-entity-names)

(global-set-key (kbd "M-]")                 'whack-whitespace)                      ;;]


(global-set-key (kbd "C-.")                 'imenu-anywhere)
(global-set-key (kbd "C-1")                 'recenter-top-bottom)





;;(global-set-key (kbd "<s-home>")          'backward-forward-previous-location)
;;(global-set-key (kbd "<s-home>")          'backward-forward-next-location)


;;(global-unset-key (kbd "C-x C-s"))
;;(global-unset-key (kbd "H-k"))

;;(global-set-key (kbd "<s-home>")          'back-button-global-forward-keystrokes)
;;(global-set-key (kbd "<s-end>")           'back-button-global-backward-keystrokes)
;;(global-set-key (kbd "<s-next")           'show-marks)


(define-key global-map [f8]                 'neotree-toggle)
(define-key global-map [f9]                 'bookmark-jump)
(define-key global-map [f10]                'bookmark-set)


(global-set-key (kbd "M-]")                 'c-hungry-delete-forward)
(global-set-key (kbd "M-[")                 'c-hungry-delete-backwards)
