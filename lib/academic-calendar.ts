export interface Semester {
  id: string
  name: string
  nameEn: string
  startDate: Date
  endDate: Date
  isActive: boolean
  progress: number
  status: "upcoming" | "active" | "completed"
  academicYear: string
}

export interface AcademicYear {
  year: string
  startYear: number
  endYear: number
  semesters: Semester[]
  isActive: boolean
}

export interface AcademicCalendar {
  currentYear: AcademicYear
  previousYear: AcademicYear | null
  nextYear: AcademicYear
  activeSemester: Semester | null
}

/**
 * Generate academic year based on Mozambique's calendar
 * Academic year runs from February to December
 */
export function generateAcademicYear(startYear: number): AcademicYear {
  const semester1Start = new Date(startYear, 1, 1) // February 1
  const semester1End = new Date(startYear, 6, 31) // July 31
  const semester2Start = new Date(startYear, 7, 1) // August 1
  const semester2End = new Date(startYear, 11, 7) // December 7

  const now = new Date()
  const currentTime = now.getTime()

  // Calculate semester 1
  const semester1: Semester = {
    id: `${startYear}-S1`,
    name: `1º Semestre`,
    nameEn: `Semester 1`,
    startDate: semester1Start,
    endDate: semester1End,
    isActive: currentTime >= semester1Start.getTime() && currentTime <= semester1End.getTime(),
    progress: 0,
    status: "upcoming",
    academicYear: `${startYear}/${startYear + 1}`,
  }

  // Calculate semester 2
  const semester2: Semester = {
    id: `${startYear}-S2`,
    name: `2º Semestre`,
    nameEn: `Semester 2`,
    startDate: semester2Start,
    endDate: semester2End,
    isActive: currentTime >= semester2Start.getTime() && currentTime <= semester2End.getTime(),
    progress: 0,
    status: "upcoming",
    academicYear: `${startYear}/${startYear + 1}`,
  }

  const semesters = [semester1, semester2]

  // Calculate progress and status for each semester
  semesters.forEach((semester) => {
    const semesterStart = semester.startDate.getTime()
    const semesterEnd = semester.endDate.getTime()
    const totalDuration = semesterEnd - semesterStart

    if (currentTime < semesterStart) {
      semester.status = "upcoming"
      semester.progress = 0
    } else if (currentTime > semesterEnd) {
      semester.status = "completed"
      semester.progress = 100
    } else {
      semester.status = "active"
      semester.isActive = true
      const elapsed = currentTime - semesterStart
      semester.progress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100))
    }
  })

  const isYearActive =
    semesters.some((s) => s.isActive) ||
    (currentTime >= semester1Start.getTime() && currentTime <= semester2End.getTime())

  return {
    year: `${startYear}/${startYear + 1}`,
    startYear,
    endYear: startYear + 1,
    semesters,
    isActive: isYearActive,
  }
}

/**
 * Get current academic calendar with previous, current, and next years
 */
export function getAcademicCalendar(): AcademicCalendar {
  const now = new Date()
  const currentMonth = now.getMonth()

  // Determine current academic year start
  // If we're in January, we're still in the previous academic year
  const currentAcademicYearStart = currentMonth === 0 ? now.getFullYear() - 1 : now.getFullYear()

  const currentYear = generateAcademicYear(currentAcademicYearStart)
  const previousYear = generateAcademicYear(currentAcademicYearStart - 1)
  const nextYear = generateAcademicYear(currentAcademicYearStart + 1)

  const activeSemester = currentYear.semesters.find((s) => s.isActive) || null

  return {
    currentYear,
    previousYear,
    nextYear,
    activeSemester,
  }
}

/**
 * Get active semester
 */
export function getActiveSemester(): Semester | null {
  const calendar = getAcademicCalendar()
  return calendar.activeSemester
}

/**
 * Get current academic year
 */
export function getCurrentAcademicYear(): AcademicYear {
  const calendar = getAcademicCalendar()
  return calendar.currentYear
}

/**
 * Format date for Mozambique locale
 */
export function formatMozambiqueDate(date: Date): string {
  return date.toLocaleDateString("pt-MZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

/**
 * Format date range
 */
export function formatDateRange(startDate: Date, endDate: Date): string {
  const start = startDate.toLocaleDateString("pt-MZ", {
    day: "numeric",
    month: "short",
  })
  const end = endDate.toLocaleDateString("pt-MZ", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
  return `${start} - ${end}`
}

/**
 * Get days remaining in semester
 */
export function getDaysRemaining(semester: Semester): number {
  const now = new Date()
  const end = semester.endDate
  const diffTime = end.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(0, diffDays)
}

/**
 * Get days since semester started
 */
export function getDaysSinceStart(semester: Semester): number {
  const now = new Date()
  const start = semester.startDate
  const diffTime = now.getTime() - start.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(0, diffDays)
}

/**
 * Get semester duration in days
 */
export function getSemesterDuration(semester: Semester): number {
  const diffTime = semester.endDate.getTime() - semester.startDate.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

/**
 * Check if date is within semester
 */
export function isDateInSemester(date: Date, semester: Semester): boolean {
  const time = date.getTime()
  return time >= semester.startDate.getTime() && time <= semester.endDate.getTime()
}

/**
 * Get semester by ID
 */
export function getSemesterById(semesterId: string): Semester | null {
  const calendar = getAcademicCalendar()
  const allSemesters = [
    ...calendar.currentYear.semesters,
    ...(calendar.previousYear?.semesters || []),
    ...calendar.nextYear.semesters,
  ]
  return allSemesters.find((s) => s.id === semesterId) || null
}

/**
 * Get all semesters for a given year range
 */
export function getSemestersForYears(startYear: number, endYear: number): Semester[] {
  const semesters: Semester[] = []
  for (let year = startYear; year <= endYear; year++) {
    const academicYear = generateAcademicYear(year)
    semesters.push(...academicYear.semesters)
  }
  return semesters.sort((a, b) => b.startDate.getTime() - a.startDate.getTime())
}
