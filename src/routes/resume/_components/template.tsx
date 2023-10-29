import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { Html } from "react-pdf-html";
import { format } from "date-fns";
import React from "react";
import { Schema } from "../_utils/schemas";

const FONT_FAMILY_MAP = {
  courier: {
    normal: "Courier",
    bold: "Courier-Bold",
    italic: "Courier-Oblique",
    boldItalic: "Courier-BoldOblique",
  },
  helvetica: {
    normal: "Helvetica",
    bold: "Helvetica-Bold",
    italic: "Helvetica-Oblique",
    boldItalic: "Helvetica-BoldOblique",
  },
  "times-roman": {
    normal: "Times-Roman",
    bold: "Times-Bold",
    italic: "Times-Italic",
    boldItalic: "Times-BoldItalic",
  },
};

const FONT_SIZE_MAP = {
  10: {
    small: 8,
    normal: 10,
    large: 12,
    title: 14,
  },
  12: {
    small: 10,
    normal: 12,
    large: 14,
    title: 14,
  },
  14: {
    small: 12,
    normal: 14,
    large: 16,
    title: 14,
  },
} as const;

type SkillLevelProps = {
  level: string;
  fontSize: (typeof FONT_SIZE_MAP)[keyof typeof FONT_SIZE_MAP];
};

function SkillLevel({ level, fontSize }: SkillLevelProps) {
  const skillMap: { [key: string]: number } = {
    novice: 1,
    beginner: 2,
    intermediate: 3,
    advanced: 4,
    expert: 5,
  };

  const numberOfCircles = skillMap[level] || 0;
  const numberOfEmptyCircles = 5 - numberOfCircles;

  return (
    <View style={{ flexDirection: "row" }}>
      {Array.from({ length: numberOfCircles }, (_, idx) => (
        <View
          key={idx}
          style={{
            width: fontSize.normal / 2,
            height: fontSize.normal / 2,
            borderRadius: 5,
            backgroundColor: "black",
            margin: 1,
          }}
        />
      ))}
      {Array.from({ length: numberOfEmptyCircles }, (_, idx) => (
        <View
          key={numberOfCircles + idx}
          style={{
            width: fontSize.normal / 2,
            height: fontSize.normal / 2,
            borderRadius: 5,
            backgroundColor: "#9ca3af",
            margin: 1,
          }}
        />
      ))}
    </View>
  );
}

type TemplateProps = {
  data: Schema;
};

function _Template(props: TemplateProps) {
  const { data } = props;

  const fontFamily =
    FONT_FAMILY_MAP[data.settings.fontFamily] || FONT_FAMILY_MAP.courier;
  const fontSize = FONT_SIZE_MAP[data.settings.fontSize] || FONT_SIZE_MAP[10];

  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: fontFamily.normal,
      flexDirection: "column",
      gap: fontSize.small,
    },
    layout: {
      flexDirection: "row",
    },
    sidebar: {
      width: "30%",
      padding: fontSize.normal,
    },
    mainContent: {
      width: "70%",
      padding: fontSize.normal,
    },
    section: {
      marginBottom: 15,
    },
    title: {
      fontSize: fontSize.large,
      fontFamily: fontFamily.bold,
    },
    content: {
      fontSize: fontSize.small,
    },
    divider: {
      borderBottomWidth: 1,
      borderBottomColor: "#000",
      marginVertical: 5,
    },
    name: {
      fontSize: fontSize.title,
      fontFamily: fontFamily.bold,
      textAlign: "center",
    },
    jobTitle: {
      fontSize: fontSize.normal,
      textAlign: "center",
    },
    subSection: {
      marginBottom: fontSize.normal,
    },
    subSectionTitle: {
      fontSize: fontSize.normal,
      fontFamily: fontFamily.bold,
    },
    subSectionDate: {
      fontFamily: fontFamily.italic,
      fontSize: fontSize.small,
      color: "#374151",
      marginBottom: 4,
    },
    skills: {
      gap: 4,
    },
    skill: {
      gap: 2,
    },
    detailsSection: {
      paddingVertical: 2,
    },
    detailsTitle: {
      paddingBottom: 1,
      fontFamily: fontFamily.bold,
      fontSize: fontSize.normal,
    },
    summary: {
      marginBottom: fontSize.normal,
    },
  });

  const stylesheet = {
    p: {
      fontSize: fontSize.normal,
      margin: 0,
      padding: 0,
      fontFamily: fontFamily.normal,
    },
    strong: {
      fontWeight: 400,
      fontFamily: fontFamily.bold,
    },
    bold: {
      fontWeight: 400,
      fontFamily: fontFamily.bold,
    },
    em: {
      fontFamily: fontFamily.italic,
    },
    ul: {
      width: "90%",
      margin: 0,
      fontSize: fontSize.normal,
      listStyleType: "disc",
    },
    ol: {
      width: "90%",
      margin: 0,
      fontSize: fontSize.normal,
      listStyleType: "disc",
    },
  };

  let summaryHtml = "";

  let firstName = "";
  let lastName = "";

  let jobTitle = "";

  data.sections.forEach((section) => {
    if (section.type === "personalDetails") {
      summaryHtml = section.summary;
      firstName = section.firstName;
      lastName = section.lastName;
      jobTitle = section.wantedJobTitle;
    }
  });

  return (
    <Document>
      <Page style={styles.page}>
        <View>
          <Text style={styles.name}>
            {firstName} {lastName}
          </Text>
          <Text style={styles.jobTitle}>{jobTitle}</Text>
        </View>
        <View style={styles.layout}>
          <View style={styles.sidebar}>
            {data.sections.map((section, sectionIdx) => {
              if (section.type === "personalDetails") {
                return (
                  <View key={sectionIdx} style={styles.section}>
                    <View>
                      <Text style={styles.title}>Details</Text>
                      <View style={styles.divider} />
                      <View style={styles.detailsSection}>
                        <Text style={styles.detailsTitle}>Personal</Text>
                        <Text style={styles.content}>
                          {section.placeOfBirth}
                        </Text>
                        {section.dateOfBirth ? (
                          <Text style={styles.content}>
                            {format(section.dateOfBirth, "MMMM d, yyyy")}
                          </Text>
                        ) : null}

                        {section.drivingLicense ? (
                          <Text style={styles.content}>
                            License: {section.drivingLicense}
                          </Text>
                        ) : null}
                        <Text style={styles.content}>
                          {section.nationality}
                        </Text>
                      </View>
                      <View style={styles.detailsSection}>
                        <Text style={styles.detailsTitle}>Address</Text>
                        {section.country || section.city ? (
                          <Text style={styles.content}>
                            {section.country}, {section.city}
                          </Text>
                        ) : null}
                        <Text style={styles.content}>{section.address}</Text>
                        <Text style={styles.content}>{section.postalCode}</Text>
                      </View>
                      <View style={styles.detailsSection}>
                        <Text style={styles.detailsTitle}>Contact</Text>
                        <Text style={styles.content}>{section.email}</Text>
                        <Text style={styles.content}>{section.phone}</Text>
                      </View>
                    </View>
                  </View>
                );
              } else if (section.type === "skills") {
                return (
                  <View key={sectionIdx} style={styles.section} wrap={false}>
                    <Text style={styles.title}>{section.title}</Text>
                    <View style={styles.divider} />
                    <View style={styles.skills}>
                      {section.skills.map((skill, skillIdx) => (
                        <View style={styles.skill} key={skillIdx}>
                          <Text key={skillIdx} style={styles.content}>
                            {skill.name}
                          </Text>
                          <SkillLevel level={skill.level} fontSize={fontSize} />
                        </View>
                      ))}
                    </View>
                  </View>
                );
              } else if (section.type === "languages") {
                return (
                  <View key={sectionIdx} style={styles.section}>
                    <Text style={styles.title}>Languages</Text>
                    <View style={styles.divider} />
                    {section.languages.map((lang, idx) => (
                      <Text key={idx} style={styles.content}>
                        {lang.name} ({lang.level})
                      </Text>
                    ))}
                  </View>
                );
              }
              return null;
            })}
          </View>

          <View style={styles.mainContent}>
            {summaryHtml ? (
              <View style={styles.section}>
                <Text style={styles.title}>Profile</Text>
                <View style={styles.divider} />
                <View style={styles.summary}>
                  <Html stylesheet={stylesheet}>{summaryHtml}</Html>
                </View>
              </View>
            ) : null}

            {data.sections.map((section, sectionIdx) => {
              if (section.type === "educations") {
                return (
                  <View key={sectionIdx} style={styles.section}>
                    <Text style={styles.title}>{section.title}</Text>
                    <View style={styles.divider} />
                    {section.educations.map((edu, eduIdx) => (
                      <View key={eduIdx} style={styles.subSection} wrap={false}>
                        <Text style={styles.subSectionTitle}>{edu.school}</Text>
                        <Text style={styles.subSectionDate}>
                          {edu.startDate
                            ? format(edu.startDate, "MMMM yyyy")
                            : "N/A"}{" "}
                          -{" "}
                          {edu.endDate
                            ? format(edu.endDate, "MMMM yyyy")
                            : "Present"}
                        </Text>
                        <Html stylesheet={stylesheet}>{edu.description}</Html>
                      </View>
                    ))}
                  </View>
                );
              } else if (section.type === "employmentHistory") {
                return (
                  <View key={sectionIdx} style={styles.section}>
                    <Text style={styles.title}>{section.title}</Text>
                    <View style={styles.divider} />
                    {section.employments.map((job, jobIdx) => (
                      <View key={jobIdx} style={styles.subSection} wrap={false}>
                        <Text style={styles.subSectionTitle}>
                          {job.jobTitle}
                        </Text>
                        <Text style={styles.subSectionDate}>
                          {job.startDate
                            ? format(job.startDate, "MMMM yyyy")
                            : "N/A"}{" "}
                          -{" "}
                          {job.endDate
                            ? format(job.endDate, "MMMM yyyy")
                            : "Present"}
                        </Text>
                        <Html stylesheet={stylesheet}>{job.description}</Html>
                      </View>
                    ))}
                  </View>
                );
              }
              return null;
            })}
          </View>
        </View>
      </Page>
    </Document>
  );
}

export const Template = React.memo(_Template);
