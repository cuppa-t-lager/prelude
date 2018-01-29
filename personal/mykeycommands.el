;;(global-unset-key (kbd "C-M-j"))
(global-unset-key (kbd "C-x C-s"))

(global-set-key (kbd "M-s-e")               'eval-buffer)

(global-set-key (kbd "<M-s-backspace>")     'c-hungry-delete-backwards)
(global-set-key (kbd "<H-M-s-backspace>")   'c-hungry-delete-forward)

(global-set-key (kbd "M-s->")   'scroll-left)
(global-set-key (kbd "M-s-<")   'scroll-right)

(global-set-key (kbd "C-:")                 'avy-goto-char)
(global-set-key (kbd "C-'")                 'avy-goto-char-2)
(global-set-key (kbd "M-g l")               'avy-goto-line)
(global-set-key (kbd "M-g w") 				'avy-goto-word-1)
(global-set-key (kbd "s-.")					'avy-goto-word-or-subword-1)
(global-set-key (kbd "M-s-.") 				'iy-go-to-char)
(global-set-key (kbd "M-s-,") 				'iy-go-to-char-backward)

;;b(global-set-key (kbd "s-a w")               'ace-swap-window)

;;(global-set-key (kbd "C-u C-c SPC")       'ace-jump-char-mode)
;;(global-set-key (kbd "C-u C-u C-c SPC")   'ace-jump-char-mode)

(global-set-key (kbd "H-w")                 'whitespace-mode)
(global-set-key (kbd "H-s")                 'rgrep)
(global-set-key (kbd "H-t")                 'ansi-term)

(setq dabbrev-case-replace nil)
(global-set-key (kbd "M-/")                 'dabbrev-expand)

(global-set-key (kbd "M-s-\\")              'indent-relative)
(global-set-key (kbd "M-s-|")               'indent-relative-below)
(global-set-key (kbd "RET")                 'newline-and-indent)
(global-set-key (kbd "<H-tab>")             'indent-code-rigidly)

(global-set-key (kbd "H-r")                 'recentf-open-files)
(global-set-key (kbd "H-SPC")               'set-rectangular-region-anchor)

;;(global-set-key (kbd "C-x b")				'helm-buffers-list)
(global-set-key (kbd "C-x b")               'helm-mini)
(global-set-key (kbd "C-x r b")             'helm-bookmarks)
(global-set-key (kbd "C-x m")               'helm-M-x)
(global-set-key (kbd "M-y")                 'helm-show-kill-ring)
(global-set-key (kbd "C-x C-f")             'helm-find-files)

(global-set-key (kbd "C-c h r")             'helm-rg)
(global-set-key (kbd "C-c h p")             'helm-rg-at-point)
(global-set-key (kbd "M-s-;")               'helm-projectile-rg)
(global-set-key (kbd "M-s-:")               'helm-projectile-rg-at-point)
(global-set-key (kbd "C-c h i")             'helm-imenu)
(global-set-key (kbd "M-s-y")               'helm-yas-complete)



;;(global-set-key (kbd "M-s-g")             'dumb-jump-go)
;;(global-set-key (kbd "M-s-b")             'dumb-jump-back)
;;(global-set-key (kbd "M-s-q")             'dumb-jump-quick-look)
;;(global-set-key (kbd "M-s-o")             'dumb-jump-go-other-window)

(global-set-key (kbd "M-s-k")               'string-inflection-kebab-case)
(global-set-key (kbd "M-s-c")               'string-inflection-lower-camelcase)




(global-set-key (kbd "H-.")                 'delete-horizontal-space)


;; make some use of the Super key
(define-key global-map [?\s-d]              'projectile-find-dir)
(define-key global-map [?\s-e]              'er/expand-region)
(define-key global-map [?\s-f]              'projectile-find-file)
(define-key global-map [?\s-g]              'projectile-grep)
(define-key global-map [?\s-j]              'prelude-top-join-line)
(define-key global-map [?\s-k]              'prelude-kill-whole-line)
(define-key global-map [?\s-l]              'goto-line)
(define-key global-map [?\s-m]              'magit-status)
(define-key global-map [?\s-o]              'prelude-open-line-above)
(define-key global-map [?\s-w]              'delete-frame)
;;(define-key global-map [?\s-x]              'exchange-point-and-mark)
(define-key global-map [?\s-p]              'projectile-switch-project)

(define-key global-map [?\s-x]              'kill-regiont)
(define-key global-map [?\s-c]              'easy-kill)
(define-key global-map [?\s-v]              'yank)
(define-key global-map [?\s-z]              'undo-tree-undo)
(define-key global-map [?\s-a]              'mark-whole-buffer)
(define-key global-map [?\s-s]              'save-buffer)

(global-set-key (kbd "H-o")                 'mode-line-other-buffer)
(global-set-key (kbd "H-M-k")               'my-kill-other-buffers)
(global-set-key (kbd "C-s-w")               'my-toggle-maximize-buffer)



(global-set-key (kbd "H-l")                 'locate)
(global-set-key (kbd "s-&")                 'kill-this-buffer)
(global-set-key (kbd "s-w")                 'kill-this-buffer)
(global-set-key (kbd "H-u")                 'my-untabify-buffer)
(global-set-key (kbd "H-t")                 'my-insert-leading-tabs)
(global-set-key (kbd "H-m")                 'my-clean-up-tabs)
(global-set-key (kbd "C-x C-e")             'eval-last-sexp)
(global-set-key (kbd "C-c <backspace>")     'crux-kill-line-backwards)
(global-set-key (kbd "C-x 4 t")             'crux-transpose-windows)
(global-set-key (kbd "H-s-r")               'find-file-in-repository)            ;;r
(global-set-key (kbd "H-s-p")               'find-file-in-project)               ;;p
(global-set-key (kbd "H-s-s")               'find-file-in-project-by-selected)   ;;s
(global-set-key (kbd "M-s-f")               'ffap)
(global-set-key (kbd "H-s-~")               'find-file-with-similar-name)
(global-set-key (kbd "M-s-i")				'imenu) ;                            ;;i
;;(global-set-key (kbd "M-s-o")             'other-frame) ;                      ;;o

(global-set-key (kbd "H-/")                 'dabbrev-expand)
(global-set-key (kbd "H-i a")               'ido-imenu-anywhere)
(global-set-key (kbd "s-=")                 'text-scale-increase)
(global-set-key (kbd "s--")                 'text-scale-decrease)



;;(global-set-key (kbd "s-C-M RIGHT")       'forward-sentence)
;;(global-set-key (kbd "M-s-C LEFT")        'backwards-sentence)

(global-set-key (kbd "M-s-j")               'js3-mode)
(global-set-key (kbd "M-s-s")               'json-mode)
(global-set-key (kbd "M-s-h")               'html-mode)
(global-set-key (kbd "H-A")                 'angular-mode)

(global-set-key (kbd "C-&")                 'my-replace-symbols-with-entity-names)

(global-set-key (kbd "M-]")                 'whack-whitespace)


(global-set-key (kbd "C-.")					'imenu-anywhere)
(global-set-key (kbd "C-1")					'recenter-top-bottom)





;;(global-set-key (kbd "<s-left>")			'backward-forward-previous-location)
;;(global-set-key (kbd "<s-right>")			'backward-forward-next-location)


;;(global-unset-key (kbd "C-x C-s"))
;;(global-unset-key (kbd "H-k"))

;;(global-set-key (kbd "<C-s-right>")		'back-button-global-forward-keystrokes)
;;(global-set-key (kbd "<C-s-left>")		'back-button-global-backward-keystrokes)
;;(global-set-key (kbd "<C-s-down>")		'show-marks)


(define-key global-map [f8]					'neotree-toggle)
(define-key global-map [f9]					'bookmark-jump)
(define-key global-map [f10]				'bookmark-set)
