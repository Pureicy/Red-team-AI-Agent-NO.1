<template>
  <SectionCard
    title="目标资产面板"
    subtitle="统一纳管已接入的 AI 应用、Agent 与 RAG 系统"
    tone="cyan"
  >
    <template #extra>
      <el-button class="neon-button">接入新目标</el-button>
    </template>

    <el-table :data="assets" class="themed-table" height="520">
      <el-table-column prop="name" label="资产名称" min-width="160" />
      <el-table-column prop="type" label="类型" min-width="130" />
      <el-table-column prop="provider" label="模型提供商" min-width="160" />
      <el-table-column prop="toolAbility" label="工具调用能力" min-width="200" />
      <el-table-column prop="lastChecked" label="最近评估时间" min-width="160" />
      <el-table-column prop="score" label="安全评分" width="100" />
      <el-table-column label="风险等级" width="100">
        <template #default="{ row }">
          <SeverityTag :label="row.risk" />
        </template>
      </el-table-column>
    </el-table>
  </SectionCard>
</template>

<script setup>
import SectionCard from '../components/SectionCard.vue'
import SeverityTag from '../components/SeverityTag.vue'
import { assets } from '../data/mock'
</script>
