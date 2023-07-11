(defun codery/get-url-from-org-link (str)
  (string-match org-bracket-link-regexp str) (match-string 1 str)
)

(defun codery/open-org-links-in-region (start end)
  "Open all Org-mode links in the selected region."
  (interactive "r")
  (save-excursion
    (goto-char start)
    (while (re-search-forward org-bracket-link-regexp end t)
      (let ((url (codery/get-url-from-org-link (match-string 0))))
        (browse-url url)))))

(defun codery/open-org-links-under-heading ()
  "Move to the parent heading and open all Org-mode links under it."
  (interactive)
  (org-up-heading-all 1)
  (let ((start (point))
        (end (save-excursion (org-end-of-subtree t t) (point))))
    (open-org-links-in-region start end)))
