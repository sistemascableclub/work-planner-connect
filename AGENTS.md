<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application structure
- Keep the recruitment landing page at the index route and its in-page application wizard in a separate component; this preserves one uninterrupted candidate journey.
- Keep candidate-input schemas in a browser-safe shared validation module; any future submission handler must reuse these schemas and verify uploaded file contents server-side.
- The application wizard is frontend-only and must not claim applications were sent or saved until a real submission service is connected.
- Define brand styling in the global semantic design system and use shared Button variants for interactive commands to keep the mobile experience consistent.
