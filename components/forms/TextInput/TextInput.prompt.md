Standard My Phil text field: bold Lato label above, 48px-tall bordered box, helper/error text below.

```jsx
<TextInput label="Email address" placeholder="you@example.com" />
<TextInput label="Email address" state="error" helperText="Helper text goes here" />
```

`state`: default (black 1px border) / focused (blue border, on real focus too) / error (red border + red helper text) / verified (green border, pair with a check-circle icon) / filled (grey background). Border is a 1px boxShadow ring, not a CSS border — copied verbatim from source.
