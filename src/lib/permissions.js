export const USER_ROLES = {
  NONE: "none",
  ADMIN: "admin",
  AGENDA_FICHA: "agenda_ficha",
  SOLO_CALENDARIO: "solo_calendario",
};

const AGENDA_PATTERNS = [
  "/dashboard/calendarioGeneral",
  "/dashboard/calendario",
  "/dashboard/agendaCitas",
  "/dashboard/bloqueosAgenda",
  "/dashboard/AgendaDetalle",
];

const FICHA_PATTERNS = [
  "/dashboard/GestionPaciente",
  "/dashboard/paciente",
  "/dashboard/FichaClinica",
  "/dashboard/FichasPacientes",
  "/dashboard/NuevaFicha",
  "/dashboard/EdicionFicha",
  "/dashboard/odontogramasPaciente",
];

export const ROLE_ROUTE_PREFIXES = {
  [USER_ROLES.NONE]: ["/dashboard/no-access"],
  [USER_ROLES.ADMIN]: ["/dashboard"],
  [USER_ROLES.AGENDA_FICHA]: ["/dashboard", "/dashboard/no-access", ...AGENDA_PATTERNS, ...FICHA_PATTERNS],
  [USER_ROLES.SOLO_CALENDARIO]: ["/dashboard", "/dashboard/no-access", ...AGENDA_PATTERNS],
};

export function normalizeRole(role) {
  if (!role || typeof role !== "string") return USER_ROLES.NONE;
  return Object.values(USER_ROLES).includes(role) ? role : USER_ROLES.NONE;
}

export function getRoleFromSessionClaims(sessionClaims) {
  const role =
    sessionClaims?.metadata?.role ||
    sessionClaims?.publicMetadata?.role ||
    sessionClaims?.role;

  return normalizeRole(role);
}

export function hasRouteAccess(role, pathname) {
  const normalizedRole = normalizeRole(role);
  const allowedPrefixes = ROLE_ROUTE_PREFIXES[normalizedRole] || ROLE_ROUTE_PREFIXES[USER_ROLES.NONE];
  return allowedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export function getRoleCapabilities(role) {
  const normalizedRole = normalizeRole(role);

  return {
    role: normalizedRole,
    canAccessAgenda: normalizedRole === USER_ROLES.ADMIN || normalizedRole === USER_ROLES.AGENDA_FICHA || normalizedRole === USER_ROLES.SOLO_CALENDARIO,
    canAccessFicha: normalizedRole === USER_ROLES.ADMIN || normalizedRole === USER_ROLES.AGENDA_FICHA,
    canAccessAdmin: normalizedRole === USER_ROLES.ADMIN,
  };
}
