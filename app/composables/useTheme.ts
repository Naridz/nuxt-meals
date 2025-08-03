export const useTheme = () => {
  const theme = useState<boolean>('theme', () => false)
  return theme
}